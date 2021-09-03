import React, {useState} from 'react'
import API from '../service/API';
import './BasePage.css'
import Card from '../image/Card.png';

export default function BasePage() {

    const [shuffleData, setShuffleData] = useState({fetchedData:null});
    const [numDeck, setNumDeck] = useState({number:1});
    const [cards, setCards] = useState({cardData:null});
    const [selectedCard, setSelectedCard] = useState({displayContent:null});
    const [toggleState, setToggleState] = useState(1);
    const [historyLog, setHistoryLog] = useState({actions:null});

    const handleChange = (e) => {
        const {value} = e.target;
        setNumDeck({number: value});
    }
    
    const toggleTab = (index) => {
        setToggleState(index);
    };

    const allotCards=async(deckId,num)=>{
        try{
            let {data,error,status}=await API.getAllCards(deckId,num);
            console.log('data',data,'error',error,'status',status);
            setCards({cardData:data.cards});
        }catch(error){
            console.error("error",error);
        }
    }

    const shuffleMethod=async()=>{
        if(!shuffleData.fetchedData)
            alert("No Deck Available to Shuffle");
        else{
            try{
                let {data,error,status}=await API.shuffleDeck(shuffleData.fetchedData.deck_id);
                console.log('data',data,'error',error,'status',status);
                setShuffleData({fetchedData:data});
                allotCards(data.deck_id,data.remaining);
                setSelectedCard({displayContent:null});
                let temp = historyLog.actions;
                let today = new Date();
                let date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
                let time = today.getHours()+':'+today.getMinutes()+':'+today.getSeconds();
                let newRec = {action:"Shuffled Deck", date:date, time:time};
            if(temp)
                temp.push(newRec);
            else
                temp=[newRec];
            setHistoryLog({actions:temp});
            }catch(error){
                console.error("error",error);
            }
        }
    }

    const newDeckMethod=async()=>{
        try{
            let {data,error,status}=await API.newDeck(numDeck.number);
            console.log('data',data,'error',error,'status',status);
            setShuffleData({fetchedData:data});
            allotCards(data.deck_id,data.remaining);
            setSelectedCard({displayContent:null});
            let temp = historyLog.actions;
            let today = new Date();
            let date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
            let time = today.getHours()+':'+today.getMinutes()+':'+today.getSeconds();
            let newRec = {action:"New Deck", date:date, time:time};
            if(temp)
                temp.push(newRec);
            else
                temp=[newRec];
            setHistoryLog({actions:temp});
        }catch(error){
            console.error("error",error);
        }
    }

    const cardSelection=(card)=>{
        try{
            setSelectedCard({displayContent:card});
            let temp = historyLog.actions;
            let today = new Date();
            let date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
            let time = today.getHours()+':'+today.getMinutes()+':'+today.getSeconds();
            let newRec = {action:"Card Selected: "+card.value+" of "+card.suit, date:date, time:time};
            if(temp)
                temp.push(newRec);
            else
                temp=[newRec];
            setHistoryLog({actions:temp});
        }catch(error){
            console.error("error",error);
        }
    }
    console.log('actions',historyLog.actions);
    return (
        <div className="container">
            <div className="bloc-tabs">
                <div className={toggleState === 1 ? "tabs active-tabs" : "tabs"} onClick={() => toggleTab(1)}>
                        Action
                </div>
                <div className={toggleState === 2 ? "tabs active-tabs" : "tabs"} onClick={() => toggleTab(2)}>
                        History
                </div>
            </div>
            <div className="content-tabs">
                <div className={toggleState === 1 ? "active-content" : "inactive"}>
                    <div className="top">
                        <div className="num">
                            <input className="Number" onChange={handleChange} placeholder="Enter Number of Decks"/>
                        </div>
                        <div className="num">
                            <div className="el">
                                <button className="NewDeck" onClick={newDeckMethod}>New Deck</button>
                            </div>
                            <div className="el">
                                <button className="Shuffle" onClick={shuffleMethod}>Shuffle</button>
                            </div>
                        </div>
                    </div>
                    {shuffleData.fetchedData && cards.cardData?
                        <div className="content second">
                            <div className="values">
                                <b>ID:</b>{shuffleData.fetchedData.deck_id} <br/>
                                <b>Cards</b>:{shuffleData.fetchedData.remaining}
                            </div>
                            <div className="cards">
                                <div className="images">
                                    {cards.cardData.map((card,i)=>{
                                        return(
                                            <div className="image" key={i} onClick={()=>cardSelection(card)}>
                                                <img src={Card} alt={"Card"+card} width="100%"/>
                                            </div>
                                        );    
                                    })}
                                </div>
                                {selectedCard.displayContent?
                                    <div className="details">
                                        <div className="cardPic">
                                            <img src={selectedCard.displayContent.image} alt="Card Details"/>
                                        </div>
                                        <div className="cardDetail">
                                            {selectedCard.displayContent.value} of {selectedCard.displayContent.suit}
                                        </div>
                                    </div>
                                :null}
                            </div>
                        </div>
                    :null}
                </div>
                <div className={toggleState === 2 ? "active-content" : "inactive"}>
                    {historyLog.actions?
                        <div className="top">
                            <div className="text">
                                <b>History of Action of the Last Page Open</b>
                            </div>
                            <div className="history">
                                <div className="row">
                                    <div className="column">
                                        Date                        
                                    </div>
                                    <div className="column">
                                        Time
                                    </div>
                                    <div className="column">
                                        Action
                                    </div>
                                </div>
                                {historyLog.actions.map((action,i)=>{
                                    return(
                                        <div className="row" key={i}>
                                            <div className="column">
                                                {action.date}
                                            </div>
                                            <div className="column">
                                                {action.time}
                                            </div>
                                            <div className="column">
                                                {action.action}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    :
                        <div className="top">
                            No history to display            
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}
