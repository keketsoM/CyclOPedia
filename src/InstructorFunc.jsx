import React, { useEffect } from "react";
const Instructor = (props) => {
  useEffect(() => {
    return () => {
      console.log("instructor - unmounted");
    };
  });
  return (
    <div className="p-3">
      <span className="h4 text-success pe-1">Instructor</span>
      <i
        className={`bi ${
          this.props.hideInstructor ? "bi-toggle-on" : "bi-toggle-off"
        } btn btn-success btn-sm`}
        onClick={() => props.handlehideInstructor()}
      ></i>
      {this.props.hideInstructor === false ? (
        <div>
          <br />
          Name: {props.instructor.name}
          <br />
          Email: {props.instructor.email}
          <br />
          Phone: {props.instructor.phone}
          <br />
        </div>
      ) : null}
    </div>
  );
};
export default Instructor;
