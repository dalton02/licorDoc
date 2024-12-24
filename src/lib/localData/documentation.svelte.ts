import { doc, type DocumentationType } from "./doc";


class Documentation {
    
    document = $state<DocumentationType[]>(doc)
    currentDocument = $state<string>("")

    groupByContext(){
        const mapa = new Map<string,DocumentationType[]>()
        for(let i in this.document){
            const current =this.document[i];
            if(!mapa.get(current.context)){
                mapa.set(current.context,[current])
            }
            else{
                mapa.set(current.context,[...mapa.get(current.context),current])
            }
        }
        return mapa
    }

    getByTitle(title:string):DocumentationType|null{
        return this.document.find((obj)=> obj.title===title) ?? null
    }


    titleToUrl(value:string):string{
        return value.trim().toLowerCase().replace(/\s+/g, '-');
    }
    
    urlToTitle(value:string) {
        return value.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '); 
    }

    

}

const documentation = new Documentation()
export default documentation