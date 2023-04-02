import React from "react"

function Btn(props) {
    let col
    if (props.value == props.selectedAns) col = "#D6DBF5"
    if (props.color.green == props.value) col = "#94D7A2"
    else if (props.color.red == props.value) col = "#F8BCBC"
    // console.log(col)
    const styles = {
        backgroundColor: { col }
    }
    return (
        <button style={{ backgroundColor: col }} onClick={props.handleClick}>{props.value}</button>
    )
}

export default function Question(props) {
    const [ans, setAns] = React.useState([])
    React.useEffect(() => {
        // setAns(props.ina)
        let newans = props.ina
        // let newans=ans.map(i=>i)
        newans.push(props.ca)
        shuffleArray(newans)
        setAns(newans)
    }, [props.ina])
    // console.log("question recieved=",props.q)
    // console.log("answers recieved=",props.ina,props.ca)
    // console.log("answers formed=",ans)
    function getAns() {
        let int = 0
        let option = ans.map(i => {
            return (
                <Btn color={props.color} key={int++} value={i.replace(/&#?\w+;/g, match => entities[match])} handleClick={() => { if (!props.result) props.setAns(props.qno, i) }} selectedAns={props.selectedAns} />
            )
        })
        return option
    }
    function shuffleArray(array) {
        // console.log(" before shuffle")
        console.log(array);
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        // console.log(" after shuffle")
        // console.log(array);
    }

    const entities = {
        "&#039;": "'",
        "&quot;": '"',
        "&ntilde;": "ñ",
        "&eacute;": "é",
        "&amp;": "&",
        "&uuml;": "ü"
    };

    return (
        <div className="qna">
            <h2 className="question">{props.q.replace(/&#?\w+;/g, match => entities[match])}</h2>
            <div className="answers">
                {getAns()}
            </div>
        </div>
    )
}