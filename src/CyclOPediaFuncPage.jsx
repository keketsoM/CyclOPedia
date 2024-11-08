import Instructor from "Instructor";
import React, { useState } from "react";
import RandomUserApi from "Utility/Api";

const CyclOPediaClassPage =()=> {
 /* constructor(props) {
    super(props);
    this.state = {
      instructor: undefined,
      studentList: [],
      studentCount: 0,
      hideInstructor: false,
      inputname: "",
      inputFeedback: "",
    };
  }*/
  const [instructor,setStateInstructor] = useState(()=>{
    return{
      instructor: undefined,
      studentList: [],
      studentCount: 0,
      hideInstructor: false,
    }
  });
  const [inputname,setStateName] = useState(()=>{
    return "";
  });

  const [inputFeedback,setStateinputFeedback] = useState(()=>{
    return "";
  });

 /* componentDidMount = async () => {
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
*/
 const handleAddStudent = () => {
    console.log("addStudent");
    setStateInstructor((previous) => {
      return {
        ...previous,
        studentCount: previous.studentCount + 1,
      };
    });
  };

  const handleRemoveAllStudent = () => {
    console.log("addStudent");
    setStateInstructor((previous,) => {
      return {
        ...previous,
        studentCount: 0,
      };
    });
  };

  const  handlehideInstructor = () => {
    setStateInstructor((previous) => {
      return {
        ...previous,
        hideInstructor: !previous.hideInstructor,
      };
    });
  };

    return (
      <div>
        {instructor.instructor && (
          <div className="p-3">
            <Instructor
              instructor={instructor.instructor}
              hideInstructor={instructor.hideInstructor}
              handlehideInstructor={instructor.handlehideInstructor}
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
            value={inputname}
            onChange={(e) => {
              this.setState(e.target.value.trim());
            }}
          ></input>
          <br/>
          value:{inputname}
          <textarea
            className="form-control"
            placeholder="Feedback..."
            value={inputFeedback}
            onChange={(e) => {
              this.setState(e.target.value.trim());
            }}
          ></textarea>
        </div>
        <div className="p-3">
          <span className="h4 text-success">Students</span>
          <br/>
          <div>Student Count: {instructor.studentCount}</div>
          <button
            className="btn btn-success btn-sm"
            onClick={handleAddStudent}
          >
            Add Student
          </button>
          &nbsp;
          <button
            className="btn btn-danger btn-sm"
            onClick={handleRemoveAllStudent}
          >
            Remove All Student
          </button>
          {instructor.studentList.map((student, index) => {
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
export default CyclOPediaClassPage;
