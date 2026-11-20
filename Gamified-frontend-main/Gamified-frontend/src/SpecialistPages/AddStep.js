import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from 'sweetalert2';
import * as image from '../Images';
import SidebarSpecialist from './SidebarSpecialist';
import './form.css';
import './styleSP.css';
const AddStep = () => {
    let navigate = useNavigate();
    const { courseId } = useParams();
    const { levelId } = useParams();


    const [step, setStep] = useState({
        steporder: "",
        steptype: "",
        content: "",
        link: "",
        level_id: "",
        quests: Array.from({ length: 10 }, (_, index) => ({
            questorder: index + 1,
            question: "",
            option1: "",
            option2: "",
            option3: "",
            option4: "",
            rightanswer: "",
        })),
    });

    const [expandedQuestions, setExpandedQuestions] = useState([]);

    const toggleQuestion = (index) => {
        if (expandedQuestions.includes(index)) {
            setExpandedQuestions(expandedQuestions.filter(q => q !== index));
        } else {
            setExpandedQuestions([...expandedQuestions, index]);
        }
    };

    const showAlertAdd = () => {
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your step has been added successfully.",
            showConfirmButton: false,
            timer: 1500
        });
    };

    const [existingOrders, setExistingOrders] = useState([]);

    useEffect(() => {
        const fetchLevelDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/level/${levelId}`);
                const steps = response.data.steps;
                const orders = steps.map(step => step.steporder);
                setExistingOrders(orders);
            } catch (error) {
                console.error("Error fetching level details:", error.message);
            }
        };
        fetchLevelDetails();
    }, [levelId]);

    const { steporder, steptype, content, link, level_id, quests } = step;

    const onInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'steporder' && (value < 1 || value > 6)) {
            alert('Please enter a number between 1 and 6 for the step order.');
            return;
        }
        setStep({ ...step, [name]: value });
    };

    const onQuestChange = (index, e) => {
        const { name, value } = e.target;
        const updatedQuests = [...quests];
        updatedQuests[index][name] = value;
        setStep({ ...step, quests: updatedQuests });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            if (existingOrders.includes(parseInt(step.steporder))) {
                alert("This step order is already in use within this level. Please choose a different one.");
                return;
            }

            const jwtToken = localStorage.getItem('jwt');
            const config = {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                    'Content-Type': 'application/json',
                },
            };

            let incompleteQuestionsExist = false;

            step.quests.forEach((quest) => {
                if (quest.question.trim() !== "") {
                    if (
                        quest.option1.trim() === "" ||
                        quest.option2.trim() === "" ||
                        quest.option3.trim() === "" ||
                        quest.option4.trim() === "" ||
                        quest.rightanswer === null
                    ) {
                        incompleteQuestionsExist = true;
                    }
                }
            });

            if (incompleteQuestionsExist) {
                alert("Please fill in all options and select the right answer for each filled question.");
                return;
            }

            if (step.steptype === 'lesson') {
                await axios.post(`http://localhost:8080/lesson/level/${levelId}`, step, config);
            } else {
                const gameResponse = await axios.post(`http://localhost:8080/game/level/${levelId}`, step, config);
                const gameId = gameResponse.data.id;
                await Promise.all(step.quests.map(quest =>
                    axios.post(`http://localhost:8080/quest/game/${gameId}`, quest, config)
                ));
            }

            showAlertAdd();
            navigate(`/ViewCourseSpecialist/${courseId}`);
        } catch (error) {
            console.error("Error adding Step:", error.message);
            alert("An error occurred while adding the step. Please try again.");
        }
    };

    return (
        <div className="d-flex">
            <SidebarSpecialist />
            <div style={styles.container} >
                <div style={styles.formcontainer} className="col-md-6 offset-md-3  rounded p-4 mt-3 mb-3">

                    <div style={styles.titleContainer}>
                        <img src={image.step} alt="Course Icon" style={styles.icon} />
                        <h2 className="text-center m-4">Add New Step</h2>
                    </div>

                    <form onSubmit={onSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Step Type</label>
                            <div className="d-flex justify-content-around">
                                <div className="form-check">
                                    <input
                                    style={styles.input}
                                        className="form-check-input"
                                        type="radio"
                                        name="steptype"
                                        value="lesson"
                                        checked={step.steptype === "lesson"}
                                        onChange={onInputChange}
                                    />
                                    <label className="form-check-label">Lesson</label>
                                </div>
                                <div className="form-check">
                                    <input
                                    style={styles.input}
                                        className="form-check-input"
                                        type="radio"
                                        name="steptype"
                                        value="game"
                                        checked={step.steptype === "game"}
                                        onChange={onInputChange}
                                    />
                                    <label className="form-check-label">Game</label>
                                </div>
                            </div>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Step Order</label>
                            <input
                            style={styles.input}
                                type="number"
                                name="steporder"
                                value={step.steporder}
                                onChange={onInputChange}
                                className="form-control input-placeholder"
                                placeholder="Order (1-6)"
                                required
                            />
                        </div>

                        {step.steptype === "lesson" && (
                            <>
                                <div className="mb-3">
                                    <label className="form-label">Content</label>
                                    <textarea
                                    style={styles.input}
                                        name="content"
                                        value={content.value}
                                        onChange={onInputChange}
                                        className="form-control input-placeholder"
                                        rows={4}
                                        placeholder="Content"
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Link (Optional)</label>
                                    <input
                                    style={styles.input}
                                        type="text"
                                        name="link"
                                        value={link}
                                        onChange={onInputChange}
                                        className="form-control input-placeholder"
                                        placeholder="Link"
                                    />
                                    {!isValidLink(link) && link && (
                                        <p style={{ color: "red" }}>Please enter a valid link.</p>
                                    )}
                                </div>
                            </>
                        )}

                        {step.steptype === "game" && (
                            <>
                                {quests.map((quest, index) => (
                                    <div key={index} className="mb-3">
                                        <h4 onClick={() => toggleQuestion(index)} style={{ cursor: 'pointer' }}>
                                            Question {index + 1} {expandedQuestions.includes(index) ? '[-]' : '[+]'}
                                        </h4>
                                        {expandedQuestions.includes(index) && (
                                            <>
                                                <div className="mb-3">
                                                    <textarea
                                                    style={styles.input}
                                                        name="question"
                                                        value={quest.question}
                                                        onChange={(e) => onQuestChange(index, e)}
                                                        className="form-control input-placeholder"
                                                        rows={2}
                                                        placeholder="Question"
                                                    />
                                                </div>
                                                <div className="mb-3">
                                                    <input
                                                    style={styles.input}
                                                        type="text"
                                                        name="option1"
                                                        value={quest.option1}
                                                        onChange={(e) => onQuestChange(index, e)}
                                                        className="form-control input-placeholder"
                                                        placeholder="Option 1"
                                                    />
                                                </div>
                                                <div className="mb-3">
                                                    <input
                                                    style={styles.input}
                                                        type="text"
                                                        name="option2"
                                                        value={quest.option2}
                                                        onChange={(e) => onQuestChange(index, e)}
                                                        className="form-control input-placeholder"
                                                        placeholder="Option 2"
                                                    />
                                                </div>
                                                <div className="mb-3">
                                                    <input
                                                    style={styles.input}
                                                        type="text"
                                                        name="option3"
                                                        value={quest.option3}
                                                        onChange={(e) => onQuestChange(index, e)}
                                                        className="form-control input-placeholder"
                                                        placeholder="Option 3"
                                                    />
                                                </div>
                                                <div className="mb-3">
                                                    <input
                                                    style={styles.input}
                                                        type="text"
                                                        name="option4"
                                                        value={quest.option4}
                                                        onChange={(e) => onQuestChange(index, e)}
                                                        className="form-control input-placeholder"
                                                        placeholder="Option 4"
                                                    />
                                                </div>
                                                <div className="mb-3">
                                                    <select
                                                     style={styles.input}
                                                        name="rightanswer"
                                                        value={quest.rightanswer}
                                                        onChange={(e) => onQuestChange(index, e)}
                                                        className="form-control input-placeholder"
                                                    >
                                                        <option value="">Select Right Answer</option>
                                                        <option value="1">Option 1</option>
                                                        <option value="2">Option 2</option>
                                                        <option value="3">Option 3</option>
                                                        <option value="4">Option 4</option>
                                                    </select>
                                                </div>
                                            </>
                                        )}

                                    </div>
                                ))}
                            </>
                        )}

                        <div style={styles.buttonContainer}>
                        <button className="btn btn-outline-primary mx-2" style={styles.confirmbtn}
                                onMouseEnter={(e) => Object.assign(e.target.style, styles.confirmbtnHover)}
                                onMouseLeave={(e) => Object.assign(e.target.style, styles.confirmbtn)}
                                type="submit" >Confirm</button>

                            <Link className="btn btn-outline-primary mx-2" to={`/ViewCourseSpecialist/${courseId}`}
                                style={styles.linkbtn}
                                onMouseEnter={(e) => Object.assign(e.target.style, styles.linkbtnHover)}
                                onMouseLeave={(e) => Object.assign(e.target.style, styles.linkbtn)}>
                                Cancel
                            </Link>

                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        width: '100%',
        display: 'flex',
        background: `url(${image.bgImgage})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: ' cover',
        backgroundPosition: 'center',

    },

    formcontainer: {
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'nowrap',
        justifyContent: 'flex-star',
        alignItems: 'stretch',
       color: 'white',
        backgroundImage: 'linear-gradient(rgb(198 64 111 / 59%),  rgb(9 6 75))',
        boxShadow: 'rgba(174, 83, 144, 0.9) -11px -8px 15px, rgb(13 114 158) 5px -9px 12px, rgb(0 206 255) -3px 2px 5px, rgb(14 109 165) 6px 8px 12px', 
        borderRadius: '10px',  
    },
    titleContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

        flexDirection: 'column',
    },
    formtitle: {
        marginTop: '2px',
        marginBottum: '1px',
        textAlign: 'center',

    },
    icon: {
        width: '150px',
        height: '150px',
    },
    buttonContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        //   marginBottom: '10px',
        marginTop: '10px',
    },
    confirmbtn: {
        marginRight: '65px',
        padding: '3px 10px',
        fontSize: '15px',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
        backgroundColor: '#1babcb',
        border: '2px solid #1babcb',
        transform: 'translateY(0)',
    },


    linkbtn: {
        padding: '3px 10px',
        fontSize: '14px',
        color: '#fff',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
        backgroundColor: '#ffffff',
        color: '#1babcb',
        border: '2px solid #1babcb',
        transform: 'translateY(0)',
    },


    linkbtnHover: {
        backgroundColor: '#1babcb',
        color: '#fff',
        transform: 'translateY(-5px)',

    },

    confirmbtnHover: {
        backgroundColor: '#ffffff',
        border: '2px solid #1babcb',
        color: '#1babcb',
        transform: 'translateY(-5px)',

    },
    input: {
        backgroundColor: '#07064652',
        color: 'rgb(0, 209, 255)',
        border: '2px solid rgb(0, 209, 255)',
    },
};

const isValidLink = (url) => {
    try {
        new URL(url);
        return true;
    } catch (error) {
        return false;
    }
};

export default AddStep;
