import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import {
  UnorderedListOutlined,
  AreaChartOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Form, Input, Modal, Select, Table, message, DatePicker } from "antd";
import axios from "axios";
import Spinner from "./../components/Spinner";
import moment from "moment";
import Analytics from "../components/Analytics";
const { RangePicker } = DatePicker;

const HomePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [loding, setLoding] = useState(false);
  const [transactionData, setTransactionData] = useState([]);
  const [frequency, setFrequency] = useState("365");
  const [selectDate, setSelectDate] = useState("");
  const [type, setType] = useState("all");
  const [viewData, setViewData] = useState("table");
  const [editable, setEditable] = useState(null);
  const [get,setGet]=useState(false);

  const getTransactionData = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      setLoding(true);
      const data = await axios.post("/api/v1/transaction/get-transaction", {
        userId: user._id,
        frequency,
        selectDate,
        type,
      });

      setLoding(false);

      setTransactionData(data.data.transaction);
    } catch (error) {
      setLoding(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getTransactionData();
  }, [frequency, selectDate, type,get]);

  const handleSubmit = async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      if (editable) {
        setLoding(true);
        await axios.post("/api/v1/transaction/edit-transaction", {
          payload: {
            ...values,
            userId: user._id,
          },
          transactionId: editable._id,
        });
        setLoding(false);
        setShowModal(false);
        setGet(!get);
        
        message.success("Transaction Update SuccessFully");
      } else {
        setLoding(true);
        await axios.post("/api/v1/transaction/add-transaction", {
          ...values,
          userId: user._id,
        });
        setLoding(false);
        setShowModal(false);
        message.success("Transaction Added SuccessFully");
      }
    } catch (error) {
      setLoding(false);
      console.log(error);
    }
  };

  const deleteHandler = async (record) => {
    try {
      setLoding(true);
      await axios.post("/api/v1/transaction/delete-transaction", {
        transactionId: record._id,
      });
      setGet(!get);
      message.success("Transaction Delete SuccessFully");
    } catch (error) {
      setLoding(false);
      message.error("Error in delete Transaction");
    }
  };

  const column = [
    {
      title: "Date",
      dataIndex: "date",
      render: (text) => <span>{moment(text).format("DD-MM-YYYY")}</span>,
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Reference",
      dataIndex: "reference",
    },
    
    {
      title: "Action",
      render: (text, record) => (
        <div>
          <EditOutlined className="text-primary"
            onClick={() => {
              setEditable(record);
              setShowModal(true);
            }}
          />
          <DeleteOutlined
            className="mx-2 text-danger"
            onClick={() => deleteHandler(record)}
          />
        </div>
      ),
    },
  ];

  return (
    <Layout>
      {loding && <Spinner />}

      <div className="main-div"><div className="filters">
        <div>
          <h6>Select frequency</h6>
          <Select value={frequency} onChange={(values) => setFrequency(values)}>
            <Select.Option value="7">Last 1 Week</Select.Option>
            <Select.Option value="30">Last 1 Month</Select.Option>
            <Select.Option value="365">Last 1 Year</Select.Option>
            <Select.Option value="custom">custom</Select.Option>
          </Select>
          {frequency === "custom" && (
            <RangePicker
              value={selectDate}
              onChange={(values) => setSelectDate(values)}
            />
          )}
        </div>

        <div>
          <h6>Select type</h6>
          <Select value={type} onChange={(values) => setType(values)}>
            <Select.Option value="all">All</Select.Option>
            <Select.Option value="income">Income</Select.Option>
            <Select.Option value="expense">Expanse</Select.Option>
          </Select>
        </div>

        <div className="switch-icon">
          <UnorderedListOutlined
            className={`mx-2 ${
              viewData === "table" ? "active-icon" : "inactive-icon"
            }`}
            onClick={() => setViewData("table")}
          />
          <AreaChartOutlined
            className={`mx-2 ${
              viewData === "analytics" ? "active-icon" : "inactive-icon"
            }`}
            onClick={() => setViewData("analytics")}
          />
        </div>

        <div>
          <button
            className="btn btn-primary"
            onClick={() => setShowModal(true)}
          >
            Add New
          </button>
        </div>
      </div></div>
      

      <div className="content">
        {viewData === "table" ? (
          <Table className="table-div fw-bold bg-body-secondary " columns={column} dataSource={transactionData} />
        ) : (
          <Analytics transactionData={transactionData} />
        )}
      </div>
      <Modal
        title={editable ? "Edit Transaction" : "Add Transaction"}
        open={showModal}
        onCancel={() => {setShowModal(false)}}
        footer={false}
        
      >
        <hr />
        <Form
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={editable}
          
          
        >
          <Form.Item label="Amount" name="amount">
            <Input type="text" />
          </Form.Item>

          <Form.Item label="Type" name="type">
            <Select>
              <Select.Option value="income">Income</Select.Option>
              <Select.Option value="expense">Expanse</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="Category" name="category">
            <Select>
              <Select.Option value="tip">Tip</Select.Option>
              <Select.Option value="salary">Salary</Select.Option>
              <Select.Option value="project">Project</Select.Option>
              <Select.Option value="travels">Travels</Select.Option>
              <Select.Option value="bills">Bills</Select.Option>
              <Select.Option value="medical">Medical</Select.Option>
              <Select.Option value="fee">Fee</Select.Option>
              <Select.Option value="tax">TAX</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="Date" name="date">
            <Input type="date" />
          </Form.Item>

          <Form.Item label="Reference" name="reference">
            <Input type="text" />
          </Form.Item>


          <div className="d-flex justify-content-end ">
            <button type="submit" className="btn btn-primary">
              SAVE
            </button>
          </div>
        </Form>
      </Modal>
    </Layout>
  );
};

export default HomePage;
