import React, { useEffect } from "react";
const Instructor = (props) => {
  useEffect(() => {
    console.log("This will be called on every render");
  });

  useEffect(() => {
    console.log("This will be called on Initial/first Render Mount");
  }, []);

  useEffect(() => {
    console.log(
      "This will be called on whenever value of hideInstructor changes"
    );
  }, [props.Instructor]);

  useEffect(() => {
    console.log("This will be called on Initial/first Render Mount");
    return () => {
      console.log("This will be called on when components will be unmounted");
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
