import React from "react";
import RandomUserApi from "Utility/Api";
class CyclOPediaClassPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      instructor: undefined,
      studentList: [],
      studentCount: 0,
      hideInstructor: false,
    };
  }
  componentDidMount = async () => {
    console.log("component Did Mount");
    const response = await RandomUserApi();
    console.log(response);
    this.setState((previous) => {
      return {
        instructor: {
          name: response.data.first_name + " " + response.data.last_name,
          email: response.data.email,
          phone: response.data.phone_number,
        },
      };
    });
  };
  componentDidUpdate() {
    console.log("component Did Update");
  }
  componentWillUnmount() {
    console.log("component Will Unmount");
  }

  handleAddStudent = () => {
    console.log("addStudent");
    this.setState((previous) => {
      return {
        studentCount: previous.studentCount + 1,
      };
    });
  };

  handleRemoveAllStudent = () => {
    console.log("addStudent");
    this.setState(() => {
      return {
        studentCount: 0,
      };
    });
  };
  render() {
    console.log("render component");
    return (
      <div>
        {this.state.instructor && (
          <div className="p-3">
            <span className="h4 text-success">Instructor</span>
            <i className="bi bi-toggle-off btn btn-success btn-sm"></i>
            <br />
            Name: {this.state.instructor.name}
            <br />
            Email: {this.state.instructor.email}
            <br />
            Phone: {this.state.instructor.phone}
            <br />
          </div>
        )}
        <div className="p-3">
          <span className="h4 text-success">Students</span>
          <br />
          <div>Student Count: {this.state.studentCount}</div>
          <button
            className="btn btn-success btn-sm"
            onClick={this.handleAddStudent}
          >
            Add Student
          </button>
          &nbsp;
          <button
            className="btn btn-danger btn-sm"
            onClick={this.handleRemoveAllStudent}
          >
            Remove All Student
          </button>
        </div>
      </div>
    );
  }
}
export default CyclOPediaClassPage;
