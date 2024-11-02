import React from "react";
class Instructor extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = async () => {
    console.log("component Did Mount (child)");
  };
  componentDidUpdate() {
    console.log("component Did Update (child)");
  }
  componentWillUnmount() {
    console.log("component Will Unmount (child)");
  }

  render() {
    return (
      <div className="p-3">
        <span className="h4 text-success pe-1">Instructor</span>
        <i
          className={`bi ${
            this.props.hideInstructor ? "bi-toggle-on" : "bi-toggle-off"
          } btn btn-success btn-sm`}
          onClick={() => this.props.handlehideInstructor()}
        ></i>
        {this.props.hideInstructor === false ? (
          <div>
            <br />
            Name: {this.props.instructor.name}
            <br />
            Email: {this.props.instructor.email}
            <br />
            Phone: {this.props.instructor.phone}
            <br />
          </div>
        ) : null}
      </div>
    );
  }
}
export default Instructor;
