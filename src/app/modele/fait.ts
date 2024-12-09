//-----------------------------------
  //   Fichier : fait.ts
  //   Par:      Alain Martel
  //   Date :    2024-10-21
  //   modifié par : 
  //-----------------------------------

  import { dateISO, tr } from "../util";
import { Commentaire } from "./commentaire";
import { SessionTravail } from "./sessionTravail";

export class Fait{
    idTache=0;
    numTache="";
    date="";
    heure="";
    type="";
    contenu="";

    constructor(st:SessionTravail, traiteDebut=true, comm:Commentaire=new Commentaire())
    {
        this.idTache = st.idTache;
        this.numTache = st.numTache;
        
        let horodate = "";
        
        if (comm.contenu.length == 0)
        {

           if (traiteDebut)
           {
              horodate = st.debut;
              this.type = "debut";
           }
           else
           {
             horodate = st.fin;
             this.type="fin";
           }
        }
        else
        {
            this.contenu = comm.contenu;
            horodate =  comm.horodateur;
            this.type = "commentaire";
        }

        //tr(horodate);
        let tabInfoDate = horodate.split(" ");
        this.date = tabInfoDate[0];
        this.heure = tabInfoDate[1];
    }
}