import React, { useState, useContext } from 'react';
import { Form, Pagination, Table, Button } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import InvoiceExpenceContext from './../../Providers/InvoiceExpence/index';
import Loader from '../../Utils/Loader';
import { useNavigate } from 'react-router-dom';

const Expence = ({ type }) => {
    const {
        handleviewExpence,
        setEditExpence,
        handleOpenEditExpence,
        expence,
        setPaginationExpence,
        paginationExpence,
        handleAddExpense,
        handleFinishExpence,
        fetchExpence,
        expencegraph,
        Loading
    } = useContext(InvoiceExpenceContext);

    const navigate = useNavigate();
    const [expandedRowKey, setExpandedRowKeys] = useState([]);

    const [visible, setVisible] = useState(false);
    const [form] = Form.useForm();

    const leavedata = [];

    const showDrawer = () => {
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
    };

    function formatCurrency(amount) {
        return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
    }

    const data = expence?.map((item, index) => ({
        key: item._id,
        expense_type: item.expense_type,
        expense_cost: formatCurrency(item.expense_cost),
        expense_date: dayjs(item?.expense_date).format("DD-MM-YYYY"),
        tax_cost: item?.tax_cost,
        expense_salary: item?.expense_salary,
        action: item?._id,
        employee_id: item?.employee_id ? `${item.employee_id?.firstname} ${item.employee_id?.lastname}` : item.others_type,
    }));

    const columns = [
        {
            title: 'Expense For',
            dataIndex: 'employee_id',
            key: 'employee_id',
        },
        {
            title: 'Expense Type',
            dataIndex: 'expense_type',
            key: 'expense_type',
            render: (text) => <span className="badge badge-info light border-0">{text}</span>
        },
        {
            title: 'Date',
            dataIndex: 'expense_date',
            key: 'expense_date',
        },
        Table.EXPAND_COLUMN,
        {
            title: 'Expense Cost (₹)',
            dataIndex: 'expense_cost',
            key: 'expense_cost',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (text, record) => (
                <div className='d_f g_10 a_i_c'>
                    <i className="fa-solid fa-pen-to-square text-primary"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                            handleOpenEditExpence();
                            handleviewExpence(record?.action);
                        }}
                    ></i>
                </div>
            )
        },
    ];

    const handleExpand = (expanded, record) => {
        setExpandedRowKeys(expanded ? [record.key] : []);
    };

    const customExpandIcon = (props) => {
        if (props.expanded) {
            return <MinusOutlined onClick={() => props.onExpand(props.record, false)} />;
        } else {
            return <PlusOutlined onClick={() => props.onExpand(props.record, true)} />;
        }
    };

    return (
        <>
            {Loading ? (
                <Loader />
            ) : (
                <div className="table-responsive">
                    <Table
                        columns={columns}
                        pagination={false}
                        expandable={{
                            expandedRowKeys: expandedRowKey,
                            onExpand: handleExpand,
                            expandIcon: customExpandIcon,
                            expandedRowRender: (record) => (
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent:"flex-end",
                                        marginRight:"130px",
                                        alignItems:"center",
                                       
                                        gap: "10px",
                                        
                                    }}
                                >
                                    <p style={{ fontSize: "11px" }}>
                                        <span
                                            style={{ fontSize: "11px" }}
                                            className="badge badge-success light border-0 me-2">
                                            Salary:
                                        </span>
                                        {formatCurrency(record.expense_salary || 0)}
                                    </p>
                                    <p style={{ fontSize: "10px" }}>
                                        <span
                                            className="badge badge-warning light border-0 me-2"
                                            style={{ fontSize: "11px" }}>
                                            Tax
                                        </span>
                                        {formatCurrency(record.tax_cost || 0)}
                                    </p>
                                </div>
                            ),
                        }}
                        dataSource={data}
                    />
                    <div className='d_f justify-content-end mt-3 mb-3'>
                        <Pagination
                            showSizeChanger
                            onChange={(e) => setPaginationExpence({
                                ...paginationExpence,
                                current: e
                            })}
                            defaultCurrent={paginationExpence?.current}
                            total={paginationExpence?.total}
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default Expence;
