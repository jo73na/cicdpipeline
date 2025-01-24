import React from 'react';
import { Table, Card, Row, Col, Divider } from 'antd';
import { 
  Building2, 
  CreditCard, 
  Wallet, 
  Building, 
  MapPin,
  GraduationCap,
  Contact,
  FileText,
  Users,
  CircleDollarSign,
  BadgeCheck,
  MapPinned,
  Globe,
  Mail,
  Phone,
  Calendar,
  User,
  Briefcase,
  Download
} from 'lucide-react';

const IconWrapper = ({ icon: Icon, color = "#4F46E5" }) => (
    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-50">
      <Icon size={16} style={{ 
        color: color,
        strokeWidth: 1.5,
      }} />
    </div>
  );


const InfoCard = ({ title, value, icon: Icon, color }) => (
  <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-100">
    <IconWrapper icon={Icon} color={color} />
    <div>
      <p className="text-sm text-gray-500 m-0">{title}</p>
      <p className="text-sm font-medium m-0">{value || 'N/A'}</p>
    </div>
  </div>
);

// const Section = ({ title, children, icon: Icon }) => (
//   <div className="mb-6">
//     <div className="flex items-center gap-4 mb-4">
//       <Icon size={18} className="text-indigo-600" />
//       <h3 className="text-lg font-semibold text-gray-900 m-0">{title}</h3>
//     </div>
//     {children}
//   </div>
// );
const Section = ({ title, children, icon: Icon }) => (
    <div style={{ marginBottom: "16px" }}>
      <div className="flex items-center gap-1 mb-1 px-3">
        <Icon size={16} className="text-indigo-600" />
        <span style={{
          fontSize: "12px",
          
          color: "#111827",
          letterSpacing: "0.5px", 
          marginLeft:"10px"
        }}>
          {title}
        </span>
      </div>
      {children}
    </div>
  );

  const bankColumns = [
    {
      title: 'Bank Name',
      dataIndex: 'name',
      key: 'name',
     
    },
    {
      title: 'Account number',
      dataIndex: 'accountNumber',
      key: 'accountNumber',
     
    },
    {
      title: 'IFSC code',
      dataIndex: 'ifscCode',
      key: 'ifscCode',
     
    },
    {
        title:"Branch Name",
        dataIndex:"branchName",
        key:"branchName",
        
    },
    {
      title: 'Branch',
      dataIndex: 'branch',
      key: 'branch',
    }
  ]
  const personalInfoColumns = [
    {
      title: 'Date of Birth',
      dataIndex: 'dob',
      key: 'dob',
    },
    {
      title: 'Blood Group',
      dataIndex: 'blood_group',
      key: 'blood_group',
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
    },
    {
      title: 'Marital Status',
      dataIndex: 'marital_status',
      key: 'marital_status',
    },
  ];
  const identityInfoColumns = [
    {
      title: 'Aadhar Number',
      dataIndex: 'aadhar_num',
      key: 'aadhar_num',
    },
    {
      title: 'PAN Number',
      dataIndex: 'pan_num',
      key: 'pan_num',
    },
    {
      title: 'UAN Number',
      dataIndex: 'uan_num',
      key: 'uan_num',
    },
    {
      title: 'ESIC Number',
      dataIndex: 'esic_num',
      key: 'esic_num',
    },
  ];
  const professionalInfoColumns = [
    {
      title: 'Department',
      dataIndex: 'department',
      key: 'department',
    },
    {
      title: 'Designation',
      dataIndex: 'designation',
      key: 'designation',
    },
    {
      title: 'CTC',
      dataIndex: 'ctc',
      key: 'ctc',
      render: (text) => `₹${text.toLocaleString()}`,
    },
  ];



const DetailsTab = ({ data }) => {

    const personalInfoData = [
        {
          key: '1',
          dob: new Date(data.dob).toLocaleDateString(),
          blood_group: data.blood_group,
          gender: data.gender,
          marital_status: data.marital_status,
        },
      ];
    const bankDetails = [
        {
          name: data.bankName,
          accountNumber: data.accountNumber,
          ifscCode: data.ifscCode,
          branchName:data.branchName,
          branch: data.branchAddress, // Using individual value for branch
        },
      ];
      const identityInfoData = [
        {
          key: '1',
          aadhar_num: data.aadhar_num,
          pan_num: data.pan_num,
          uan_num: data.uan_num,
          esic_num: data.esic_num,
        },
      ];
      const professionalInfoData = [
        {
          key: '1',
          department: data.department,
          designation: data.designation,
          ctc: data.yearly_ctc,
        },
      ];

      return(
  <div className="space-y-2 p-3">
    <Section  title ="Bank Details" icon={Wallet  } >
        <Table columns={bankColumns} dataSource={bankDetails} rowClassName={()=>'custom-row'} pagination={false}/>
    </Section>
    <Section title ="Personal Information" icon={User}>
        <Table columns={personalInfoColumns} dataSource={personalInfoData} rowClassName={()=>'custom-row'} pagination={false}/>
    </Section>
    <Section title ="Identity Information" icon={BadgeCheck}>
        <Table columns={identityInfoColumns} dataSource={identityInfoData} rowClassName={()=>'custom-row'} pagination={false}/>
    </Section>
    <Section title ="Professional Information" icon={Briefcase}>
        <Table columns={professionalInfoColumns} dataSource={professionalInfoData} rowClassName={()=>'custom-row'} pagination={false}/>
    </Section>
    <Section title="Bank Details" icon={Wallet}>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <InfoCard title="Bank Name" value={data.bankName} icon={Building2} color="#2563EB" />
        </Col>
        <Col span={8}>
          <InfoCard title="Account Number" value={data.accountNumber} icon={CreditCard} color="#7C3AED" />
        </Col>
        <Col span={8}>
          <InfoCard title="IFSC Code" value={data.ifscCode} icon={Building} color="#0891B2" />
        </Col>
        <Col span={8}>
          <InfoCard title="Branch Name" value={data.branchName} icon={MapPin} color="#DC2626" />
        </Col>
        <Col span={8}>
          <InfoCard title="Branch Address" value={data.branchAddress} icon={MapPinned} color="#059669" />
        </Col>
      </Row>
    </Section>

    <Section title="Identity Information" icon={BadgeCheck}>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <InfoCard title="Aadhar Number" value={data.aadhar_num} icon={FileText} color="#2563EB" />
        </Col>
        <Col span={8}>
          <InfoCard title="PAN Number" value={data.pan_num} icon={FileText} color="#7C3AED" />
        </Col>
        <Col span={8}>
          <InfoCard title="UAN Number" value={data.uan_num} icon={FileText} color="#0891B2" />
        </Col>
        <Col span={8}>
          <InfoCard title="ESIC Number" value={data.esic_num} icon={FileText} color="#DC2626" />
        </Col>
      </Row>
    </Section>

 


  </div>
);
}

const ContactsTab = ({ data }) => {
  const emergencyColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Relationship',
      dataIndex: 'relationship',
      key: 'relationship',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    }
  ];

  return (
    <div className="space-y-6 p-4">
      <Section title="Emergency Contacts" icon={Phone}>
        <Table 
          dataSource={data.emergencyContacts}
          columns={emergencyColumns}
          pagination={false}
          rowClassName={()=>'custom-row'}
          className="border rounded-lg"
        />
      </Section>

    </div>
  );
};

const DocumentCard = ({ title, fileUrl, icon: Icon }) => (
  <Card 
    className="border rounded-lg hover:shadow-md transition-shadow"
    bodyStyle={{ padding: "12px" }}
  >
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <IconWrapper icon={Icon} />
        <span className="font-medium">{title}</span>
      </div>
      {/* <Download 
        size={18} 
        className="text-gray-500 hover:text-indigo-600 cursor-pointer" 
      /> */}
    </div>
  </Card>
);

const DocumentsTab = ({ data }) => (
  <div className="space-y-6 p-4">
    <Section title="Identity Documents" icon={FileText}>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <DocumentCard title="Aadhar Card" fileUrl={data.aadhar_file} icon={FileText} />
        </Col>
        <Col span={12}>
          <DocumentCard title="PAN Card" fileUrl={data.pan_file} icon={FileText} />
        </Col>
        <Col span={12}>
          <DocumentCard title="ESIC Document" fileUrl={data.esic_file} icon={FileText} />
        </Col>
        <Col span={12}>
          <DocumentCard title="UAN Document" fileUrl={data.uan_file} icon={FileText} />
        </Col>
      </Row>
    </Section>

    <Section title="Education Documents" icon={GraduationCap}>
      <Row gutter={[16, 16]}>
        {data.education?.[0]?.ssc_file && (
          <Col span={12}>
            <DocumentCard title="SSC Certificate" fileUrl={data.education[0].ssc_file} icon={FileText} />
          </Col>
        )}
        {data.education?.[0]?.hsc_file && (
          <Col span={12}>
            <DocumentCard title="HSC Certificate" fileUrl={data.education[0].hsc_file} icon={FileText} />
          </Col>
        )}
        {data.education?.[0]?.degree_file && (
          <Col span={12}>
            <DocumentCard title="Degree Certificate" fileUrl={data.education[0].degree_file} icon={FileText} />
          </Col>
        )}
      </Row>
    </Section>
  </div>
);

const TabContent = ({ activeTab, data }) => {
  switch (activeTab) {
    case '1':
      return <DetailsTab data={data} />;
    case '2':
      return <ContactsTab data={data} />;
    case '3':
      return <DocumentsTab data={data} />;
    default:
      return null;
  }
};

export default TabContent;