import {
    Form,
 
    Checkbox,
 
  } from "antd";

export const  FromCheckBoxGroup = ({
    label,
    name,
    options,
    required,
    validationmsg,
    defaultChecked,
    onclick,
    onchange,
  }) => {
    return (
      <Form.Item
        label={label || ""}
        name={name || ""}
        rules={[
          {
            required: required,
            message: validationmsg,
          },
        ]}
        className="w_100_p m_0"
      >
        {/* <div className="switch-checkbox-group">
                      <Checkbox.Group options={options} />
                    </div> */}
      
        <Checkbox.Group
          options={options || []}
          defaultChecked={(options && options[defaultChecked]) || [""]}
          onChange={onchange}
          onClick={onclick}
        />
           
      
      </Form.Item>
    );
  };