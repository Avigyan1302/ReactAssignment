import axios from "axios";
class API{
    newDeck = async(deckCount)=>{
        try{
            deckCount=deckCount?deckCount:1;
            const {data, error, status} = await axios.get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count="+deckCount);
            return {data,error,status};
        }catch(error){
            console.error('Error',error);
            return{error: error};
        }
    }
    shuffleDeck = async(deckId)=>{
        try{
            const {data, error, status} = await axios.get("https://deckofcardsapi.com/api/deck/"+deckId+"/shuffle/");
            return {data,error,status};
        }catch(error){
            console.error('Error',error);
            return{error: error};
        }
    }

    getAllCards = async(deckId,num)=>{
        try{
            const {data, error, status} = await axios.get("https://deckofcardsapi.com/api/deck/"+deckId+"/draw/?count="+num);
            return {data,error,status};
        }catch(error){
            console.error('Error',error);
            return{error: error};
        }
    }
}
export default new API();