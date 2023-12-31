import { Form, Input, Modal } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React, { useState } from 'react';

const GroupModal = (props) => {

    const [name, setname] = useState("");
    const [description, setdescriptions] = useState("");

    const handleSave = () => {
        props.createNewGroup({
            name: name,
            description: description
        })
        props.handleShowModal()

    }

    return (
        <>
            <Modal
                title="Add new Group"
                open={props.showmodal}
                onOk={() => handleSave()}
                onCancel={props.handleShowModal}
                okText="Save"
                cancelText="Cancel"
            >
                <Form
                    name="basic"
                    labelCol={{
                        span: 5,
                    }}
                    wrapperCol={{
                        span: 20,
                    }}
                    style={{
                        maxWidth: 600,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    autoComplete="off"
                >
                    <Form.Item
                        label="name"
                    >
                        <Input value={name} onChange={(e) => setname(e.target.value)} />
                    </Form.Item>
                    <Form.Item
                        label="description"
                    >
                        <TextArea rows={4} value={description} onChange={(e) => setdescriptions(e.target.value)} />
                    </Form.Item>
                </Form>
            </Modal >
        </>
    );
};

export default GroupModal;