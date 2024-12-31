// TaskCounter.js
import React from 'react';
import CountUp from 'react-countup';

const calculateTaskCounts = (tasks) => {
    const statusConfig = {
        "Pending": "danger",
        "Not Started": "primary",
        "In Progress": "purple",
        "Cancelled": "danger",
        "Completed": "success",
    };

    // Initialize status counts with zero for all predefined statuses
    const statusCounts = Object.keys(statusConfig).reduce((counts, status) => {
        counts[status] = 0;
        return counts;
    }, {});

    // Update counts based on the tasks
    tasks.forEach((task) => {
        if (statusCounts.hasOwnProperty(task.status)) {
            statusCounts[task.status]++;
        }
    });

    // Map counts to `cardCounter` format
    return Object.entries(statusCounts).map(([title, number]) => ({
        number: String(number),
        countText: statusConfig[title],
        title,
    }));
};

const TaskCounter = ({ tasks }) => {
    const cardCounter = calculateTaskCounts(tasks);

    return (
        <div className="row task">
            {cardCounter.map((item, index) => (
                <div className="col-xl-2 col-sm-4 col-6" key={index}>
                    <div className="task-summary">
                        <div className="d-flex align-items-baseline">
                            <CountUp className={`mb-0 fs-28 fw-bold me-2 text-${item.countText}`} end={item.number} duration={'5'} />
                            <h6 className='mb-0'>{item.title}</h6>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TaskCounter;