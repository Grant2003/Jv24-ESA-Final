//-----------------------------------
  //   Fichier : 
  //   Par:      Alain Martel
  //   Date :    2024-10-21
  //   modifié par : Anthony Grenier
  //-----------------------------------

  export class Tache{
    id:number;
    numero:string;
    titre:string;
    objectif:string;
    idProjet:number;
    nomProjet:string;
    
    constructor()
    {
        this.id=0;
        this.numero="";
        this.titre="";
        this.objectif="";
        this.nomProjet="";
        this.idProjet=0;
    }
}