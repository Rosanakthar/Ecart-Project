import React, { useEffect, useState } from "react";


export default function AdminOrd(props){
    const [state, setstate] = useState(0);
    var renderdata;
    useEffect(() => {
        fetch('/api/orders/orderlist')
          .then((res) => res.json())
          .then((data) => {
            // setData(data);
            renderdata = data;
            console.log(renderdata);
            setstate((1));
          })
          .catch((err) => {
            console.log(err);
          });
      }, []);
    
    return state==1 ?(
        <div>
        <ul>
      {renderdata.map((item) => {
          return <li>{item._id}</li>
      })}
    </ul>
        </div>
    ): (<div>loadding..</div>);
}