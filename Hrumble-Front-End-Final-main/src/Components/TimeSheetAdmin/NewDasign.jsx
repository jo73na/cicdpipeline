import React, { useState, useEffect } from 'react';
import {
  ScheduleComponent,
  TimelineViews,
  ViewsDirective,
  ViewDirective,
  ResourcesDirective,
  ResourceDirective,
  Inject,
} from '@syncfusion/ej2-react-schedule';
import { extend } from '@syncfusion/ej2-base';
import '@syncfusion/ej2-base/styles/material.css';
import '@syncfusion/ej2-buttons/styles/material.css';
import '@syncfusion/ej2-calendars/styles/material.css';
import '@syncfusion/ej2-dropdowns/styles/material.css';
import '@syncfusion/ej2-inputs/styles/material.css';
import '@syncfusion/ej2-navigations/styles/material.css';
import '@syncfusion/ej2-popups/styles/material.css';
import '@syncfusion/ej2-react-schedule/styles/material.css';

const NewDasign = () => {
  const [scheduleData, setScheduleData] = useState([]);
  const [resourceData, setResourceData] = useState([
    { text: 'Srinidhi G', id: 1, color: '#ea7a57' },
    { text: 'Bhavitha Reddy', id: 2, color: '#7fa900' },
  ]);

  useEffect(() => {
    const data = [
      {
        Id: 1,
        Subject: 'Weekly off',
        StartTime: new Date(2023, 5, 22),
        EndTime: new Date(2023, 5, 23),
        ResourceId: 1,
      },
      {
        Id: 2,
        Subject: 'Weekly off',
        StartTime: new Date(2023, 5, 22),
        EndTime: new Date(2023, 5, 23),
        ResourceId: 2,
      },
      {
        Id: 3,
        Subject: '8h 54m',
        StartTime: new Date(2023, 5, 24, 9, 0),
        EndTime: new Date(2023, 5, 24, 17, 54),
        ResourceId: 2,
      },
      {
        Id: 4,
        Subject: '1h 39m',
        StartTime: new Date(2023, 5, 25, 9, 0),
        EndTime: new Date(2023, 5, 25, 10, 39),
        ResourceId: 2,
      },
    ];
    setScheduleData(extend([], data, null, true));
  }, []);

  const headerTemplate = (props) => {
    const totalPresent = scheduleData.filter(
      (event) => event.Subject !== 'Weekly off' && event.ResourceId === props.resourceData.id
    ).length;

    const totalAbsent = scheduleData.filter(
      (event) => event.Subject === 'Weekly off' && event.ResourceId === props.resourceData.id
    ).length;

    return (
      <div className="e-resource-template">
        <div className="e-resource-name">{props.resourceData.text}</div>
        <div>Total Present: {totalPresent}</div>
        <div>Total Absent: {totalAbsent}</div>
      </div>
    );
  };

  return (
    <div>
      <ScheduleComponent
        height="650px"
      
        eventSettings={{ dataSource: scheduleData }}
        group={{ resources: ['Resources'] }}
      >
        <ResourcesDirective>
          <ResourceDirective
            field="ResourceId"
            title="Employee"
            name="Resources"
            allowMultiple={false}
            dataSource={resourceData}
            textField="text"
            idField="id"
            colorField="color"
            template={headerTemplate}
          />
        </ResourcesDirective>
        <ViewsDirective>
          <ViewDirective option="TimelineDay" />
          <ViewDirective option="TimelineWeek" />
          <ViewDirective option="TimelineWorkWeek" />
          <ViewDirective option="TimelineMonth" />
        </ViewsDirective>
        <Inject services={[TimelineViews]} />
      </ScheduleComponent>
    </div>
  );
};

export default NewDasign;
