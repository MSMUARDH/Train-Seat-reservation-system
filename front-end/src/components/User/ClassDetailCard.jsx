import React from "react";
import { Card } from "antd";
const ClassDetailCard = () => (
  <Card title="Card title">
    <Card type="inner" title="Inner Card title" extra={<a href="#">More</a>}>
      Inner Card content
    </Card>
    <Card
      style={{
        marginTop: 16,
      }}
      type="inner"
      title="Inner Card title"
      extra={<a href="#">More</a>}
    >
      Inner Card content
    </Card>
  </Card>
);
export default ClassDetailCard;

// import React from 'react'

// const ClassDetailCard = () => {
//   return (
//     <div>ClassDetailCard</div>
//   )
// }

// export default ClassDetailCard
