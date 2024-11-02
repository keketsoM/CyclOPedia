import Instructor from "Instructor";
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
      inputname: "",
      inputFeedback: "",
    };
  }
  componentDidMount = async () => {
    console.log("component Did Mount");
    const response = await RandomUserApi();
    console.log(response);
    if (JSON.parse(localStorage.getItem("Clclopedia"))) {
      console.log(JSON.parse(localStorage.getItem("Clclopedia")));
      this.setState(JSON.parse(localStorage.getItem("Clclopedia")));
    } else {
      this.setState((previous) => {
        return {
          instructor: {
            name: response.data.first_name + " " + response.data.last_name,
            email: response.data.email,
            phone: response.data.phone_number,
          },
        };
      });
    }
  };
  componentDidUpdate = async (previousProps, previousState) => {
    console.log("component Did Update");
    localStorage.setItem("Clclopedia", JSON.stringify(this.state));

    console.log("New state " + this.state.studentCount);
    console.log("old state " + previousState.studentCount);
    if (previousState.studentCount < this.state.studentCount) {
      const response = await RandomUserApi();
      this.setState((previous) => {
        return {
          studentList: [
            ...previous.studentList,
            {
              name: response.data.first_name + " " + response.data.last_name,
            },
          ],
        };
      });
    } else if (previousState.studentCount > this.state.studentCount) {
      this.setState(() => {
        return {
          studentList: [],
        };
      });
    }
  };
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

  handlehideInstructor = () => {
    this.setState((previous) => {
      return {
        hideInstructor: !previous.hideInstructor,
      };
    });
  };
  render() {
    console.log("render component");
    return (
      <div>
        {this.state.instructor && (
          <div className="p-3">
            <Instructor
              instructor={this.state.instructor}
              hideInstructor={this.state.hideInstructor}
              handlehideInstructor={this.handlehideInstructor}
            />
          </div>
        )}
        <div className="p-3">
          <span className="h4 text-success">FeedBack</span>
          <br />
          <input
            type="text"
            placeholder="Name.."
            className="form-control"
            value={this.state.inputname}
            onChange={(e) => {
              this.setState({ inputname: e.target.value.trim() });
            }}
          ></input>
          <br />
          value:{this.state.inputname}
          <textarea
            className="form-control"
            placeholder="Feedback..."
            value={this.state.inputFeedback}
            onChange={(e) => {
              this.setState({ inputFeedback: e.target.value.trim() });
            }}
          ></textarea>
        </div>
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
          {this.state.studentList.map((student, index) => {
            return (
              <div className="text-white" key={index}>
                {student.name}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
export default CyclOPediaClassPage;
