import { useEffect, useState, useContext } from "react";
import { Modal, Form, Select, Input, Button } from "antd";
import JobContext from "../../Providers/JobProvider";

const EditVendorModal = ({ visible, onClose, vendorData, jobId }) => {
    const { handleUpdateVendor } = useContext(JobContext);
    const [form] = Form.useForm();
    const [salaryType, setSalaryType] = useState("Monthly");

    console.log("vemdor_assign_id::",vendorData.assign._id)

    console.log("Vendor Data::", vendorData);
if (!vendorData || !vendorData.assign) {
    console.error("Invalid vendorData! Ensure it's passed correctly.");
}

    useEffect(() => {
        if (vendorData) {
            form.setFieldsValue({
                assign: vendorData.assign._id, // Pre-fill the vendor
                vendor_clientbillable: vendorData.vendor_clientbillable,
                vendor_salary_type: vendorData.vendor_salary_type,
            });
            setSalaryType(vendorData.vendor_salary_type || "Monthly");
        }
    }, [vendorData, form]);

    const handleFinish = async (values) => {
        if (!vendorData || !vendorData._id) { 
            console.error("Invalid vendor data! Cannot proceed.");
            return;
        }
    
        let updatedData = {
            _id: vendorData._id, // ✅ Ensure correct assigneddata._id is sent
            vendor_clientbillable: Number(values.vendor_clientbillable.replace(/,/g, "")), 
            vendor_salary_type: salaryType
        };
    
        console.log("Payload being sent::", updatedData); // ✅ Debugging
    
        await handleUpdateVendor(jobId, updatedData);
    
        setTimeout(() => {
            onClose();
        }, 500);
    };
    
    
    
    
    

    return (
        <Modal
            title="Edit Assigned Vendor"
            open={visible}
            onCancel={onClose}
            footer={null}
        >
            <Form form={form} layout="vertical" onFinish={handleFinish}>
                <Form.Item
                    label="Assign To"
                    name="assign"
                >
                    <Select disabled>
                        <Select.Option value={vendorData?.assign?._id}>
                            {vendorData?.assign?.name}
                        </Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    label="Budget"
                    name="vendor_clientbillable"
                    rules={[{ required: true, message: "Please enter budget!" }]}
                >
                    <Input
                        addonBefore="₹"
                        placeholder="Enter budget"
                        onChange={(e) => {
                            const numericValue = e.target.value.replace(/[^0-9]/g, "");
                            form.setFieldsValue({ vendor_clientbillable: numericValue });
                        }}
                    />
                </Form.Item>

                <Form.Item label="Salary Type">
                    <Select value={salaryType} onChange={(e) => setSalaryType(e)}>
                        <Select.Option value="LPA">LPA</Select.Option>
                        <Select.Option value="Monthly">Monthly</Select.Option>
                        <Select.Option value="Per Hour">Hourly</Select.Option>
                    </Select>
                </Form.Item>

                <div className="d-flex justify-content-end">
                    <Button onClick={onClose} style={{ marginRight: 8 }}>Cancel</Button>
                    <Button type="primary" htmlType="submit">Save</Button>
                </div>
            </Form>
        </Modal>
    );
};

export default EditVendorModal;
