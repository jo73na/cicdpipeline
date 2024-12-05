const { admin } = require('../utils/schemaMaster');
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const authAdmin = asyncHandler(async (req, res, next) => {
  let token;

  if (req?.headers?.authorization?.startsWith('Bearer')) {
    token = req.headers.authorization.split(" ")[1];

    try {
      // Verify JWT token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const admin_check = await admin.findById(decoded?.id);

      if (!admin_check) {
        throw new Error("Not Authorized: User not found");
      }

      const currentTime = new Date();

      // Check session expiration
      if (admin_check.sessionExpiresAt && currentTime > admin_check.sessionExpiresAt) {
        throw new Error("Session expired. Please log in again.");
      }

      // Update lastActivityAt
      admin_check.lastActivityAt = currentTime;

      // Dynamically extend session expiration
      const sessionExtensionMinutes = 10; // Extend session by 10 minutes from current time
      admin_check.sessionExpiresAt = new Date(currentTime.getTime() + sessionExtensionMinutes * 60 * 1000);

      await admin_check.save(); // Save updated fields

      // Attach admin data to request
      req.user = admin_check;
      req.body.created_by = admin_check._id;
      req.body.company_id = admin_check.company_id;

      console.log(`Request received: ${req.method} ${req.url}`);
      next();
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        res.status(401).json({ message: "Token expired. Please log in again." });
      } else {
        res.status(401).json({ message: error.message || "Not Authorized" });
      }
    }
  } else {
    res.status(401).json({ message: "Authorization token missing or invalid." });
  }
});

module.exports = { authAdmin };
