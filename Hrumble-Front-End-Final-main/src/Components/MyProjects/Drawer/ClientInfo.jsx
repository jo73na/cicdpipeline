import React, { useState, useEffect, useContext } from 'react';
import { Form, Input, Row, Col, Tabs, Select, Button, Space } from 'antd';
import { Country, State, City } from 'country-state-city';
import ClientContext from '../../../Providers/ClientProvider';


const { TabPane } = Tabs;

const ClientInfo = ({projectSingle}) => {
  const [form] = Form.useForm();
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const {setEditButtonClient, handleEditClient} = useContext(ClientContext);

  

  console.log('clietinfo',projectSingle)
  // Initialize countries on component mount
  useEffect(() => {
    const allCountries = Country.getAllCountries();
    setCountries(allCountries);
  }, []);

  useEffect(() => {
    if (projectSingle) {
      form.setFieldsValue({
        clientDisplayName: projectSingle.name,
        firstName: projectSingle.p_fisrt_name?.trim(),
        lastName: projectSingle.p_last_name?.trim(),
        email: projectSingle.email_id,
        phoneNumber: projectSingle.phone_no,
        address: projectSingle.address,
        country: projectSingle.country,
        state: projectSingle.state,
        city: projectSingle.city,
        zipCode: projectSingle.zip_code,
      });
    }
  }, [projectSingle, form]);
  

  // Update states when country changes
  const handleCountryChange = (value, option) => {
    form.setFieldsValue({ state: undefined, city: undefined });
    setSelectedCountry(option.isoCode);
    const countryStates = State.getStatesOfCountry(option.isoCode);
    setStates(countryStates);
    setCities([]);
  };

  // Update cities when state changes
  const handleStateChange = (value, option) => {
    form.setFieldsValue({ city: undefined });
    setSelectedState(option.isoCode);
    const stateCities = City.getCitiesOfState(selectedCountry, option.isoCode);
    setCities(stateCities);
  };

  const onFinish = (values) => {
    setEditButtonClient(true)
   handleEditClient(values,form);
  };

  const handleReset = () => {
    form.resetFields();
    setStates([]);
    setCities([]);
    setSelectedCountry(null);
    setSelectedState(null);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      className="p-4"
    >
      <Tabs defaultActiveKey="basicInfo">
        <TabPane tab="Basic Info" key="basicInfo">
          {/* Client Display Name Row */}
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Client Display Name"
                name="clientDisplayName"
                rules={[{ required: true, message: 'Please enter client display name' }]}
              >
                <Input className='employeeForm'/>
              </Form.Item>
            </Col>
          </Row>

          {/* Contact Person Name Row */}
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="First Name"
                name="firstName"
                rules={[{ required: true, message: 'Please enter first name' }]}
              >
                <Input className='employeeForm'/>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Last Name"
                name="lastName"
                rules={[{ required: true, message: 'Please enter last name' }]}
              >
                <Input className='employeeForm' />
              </Form.Item>
            </Col>
          </Row>

          {/* Email and Phone Row */}
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: 'Please enter email' },
                  { type: 'email', message: 'Please enter a valid email' }
                ]}
              >
                <Input className='employeeForm' />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Phone Number"
                name="phoneNumber"
                rules={[
                  { required: true, message: 'Please enter phone number' },
                  { pattern: /^[0-9-+()]*$/, message: 'Please enter a valid phone number' }
                ]}
              >
                <Input className='employeeForm'/>
              </Form.Item>
            </Col>
          </Row>

          {/* Address Row */}
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                label="Address"
                name="address"
              >
                <Input.TextArea rows={3}  className='employeeForm'/>
              </Form.Item>
            </Col>
          </Row>

          {/* Country and State Row */}
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Country"
                name="country"
              >
                <Select
                  showSearch
                  placeholder="Select country"
                  onChange={handleCountryChange}
                  filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {countries.map(country => (
                    <Select.Option 
                      key={country.isoCode} 
                      value={country.name}
                      isoCode={country.isoCode}
                    >
                      {country.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="State"
                name="state"
              >
                <Select
                  showSearch
                  placeholder="Select state"
                  onChange={handleStateChange}
                  disabled={!selectedCountry}
                  filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {states.map(state => (
                    <Select.Option 
                      key={state.isoCode} 
                      value={state.name}
                      isoCode={state.isoCode}
                    >
                      {state.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          {/* City and Zip Code Row */}
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="City"
                name="city"
              >
                <Select
                  showSearch
                  placeholder="Select city"
                  disabled={!selectedState}
                  filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {cities.map(city => (
                    <Select.Option key={city.id} value={city.name}>
                      {city.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Zip Code"
                name="zipCode"
              >
                <Input  className='employeeForm'/>
              </Form.Item>
            </Col>
          </Row>
        </TabPane>

        <TabPane tab="Contact Person" key="contactPerson">
          {/* Add your contact person form fields here */}
          <p>Contact Person details form will go here</p>
        </TabPane>
      </Tabs>

      {/* Submit and Clear Buttons */}
      <Row>
        <Col span={24}>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
              <Button onClick={handleReset}>
                Clear
              </Button>
            </Space>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default ClientInfo;