import Instructor from "Instructor";
import React, { useEffect, useRef, useState } from "react";
import RandomUserApi from "Utility/Api";

const CyclOPediaClassPage = () => {
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
  const [instructor, setStateInstructor] = useState(() => {
    return {
      instructor: undefined,
      studentList: [],
      studentCount: 0,
      hideInstructor: false,
    };
  });
  const [inputname, setStateName] = useState(() => {
    return "";
  });
  const totalRender = useRef(0);
  const previousStudentCount = useRef(0);
  const focus = useRef("");

  const [inputFeedback, setStateinputFeedback] = useState(() => {
    return "";
  });
  useEffect(() => {
    console.log("This will be called on Every Render");

    totalRender.current += 1;
  });

  useEffect(() => {
    console.log("This will be called on Initial/first Render Mount");
    const getuser = async () => {
      const response = await RandomUserApi();
      setStateInstructor((previous) => {
        return {
          ...previous,
          instructor: {
            name: response.data.first_name + " " + response.data.last_name,
            email: response.data.email,
            phone: response.data.phone_number,
          },
        };
      });
    };
    if (!instructor.hideInstructor) {
      getuser();
    }
  }, [instructor.hideInstructor]);

  useEffect(() => {
    console.log("This will be called on whenever value of studentList changes");

    var addStudentList = async () => {
      const response = await RandomUserApi();
      setStateInstructor((previous) => {
        return {
          ...previous,
          studentList: [
            ...previous.studentList,
            {
              name: response.data.first_name + " " + response.data.last_name,
            },
          ],
        };
      });
    };
    if (previousStudentCount.current < instructor.studentCount) {
      addStudentList();
    } else if (previousStudentCount.current > instructor.studentCount) {
      if (instructor.studentCount === 0) {
        setStateInstructor((previous) => {
          return {
            ...previous,
            studentList: [],
          };
        });
      }
    }
  }, [instructor.studentCount]);

  useEffect(() => {
    focus.current.focus();
    console.log("This will be called on Initial/first Render Mount");
    return () => {
      console.log("This will be called on when components will be unmounted");
    };
  }, []);
  useEffect(() => {
    console.log("This will be called on Every Render");
    previousStudentCount.current = instructor.studentCount;
  }, [instructor.studentCount]);
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
    setStateInstructor((previous) => {
      return {
        ...previous,
        studentCount: 0,
      };
    });
  };

  const handlehideInstructor = () => {
    setStateInstructor((previous) => {
      return {
        ...previous,
        hideInstructor: !previous.hideInstructor,
      };
    });
  };

  return (
    <div>
      {instructor.instructor !== undefined ? (
        <div className="p-3">
          <Instructor
            instructor={instructor.instructor}
            hideInstructor={instructor.hideInstructor}
            handlehideInstructor={handlehideInstructor}
          />
        </div>
      ) : (
        <div>API did not load Instructor, Reload </div>
      )}
      <div>Render: {totalRender.current}</div>
      <div className="p-3">
        <span className="h4 text-success">FeedBack</span>
        <br />
        <input
          type="text"
          placeholder="Name.."
          className="form-control"
          value={inputname}
          onChange={(e) => {
            setStateName(e.target.value.trim());
          }}
        ></input>
        <br />
        value:{inputname}
        <textarea
          className="form-control"
          placeholder="Feedback..."
          ref={focus}
          value={inputFeedback}
          onChange={(e) => {
            setStateinputFeedback(e.target.value.trim());
          }}
        ></textarea>
      </div>
      <div className="p-3">
        <span className="h4 text-success">Students</span>
        <br />
        <div className="text-white">
          Student Count: {instructor.studentCount}
        </div>
        <button className="btn btn-success btn-sm" onClick={handleAddStudent}>
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
};
export default CyclOPediaClassPage;
