//-----------------------------------
  //   Fichier : 
  //   Par:      Alain Martel
  //   Date :    2024-10-21
  //   modifié par : Anthony Grenier
  //-----------------------------------

  export class Developpeur{
    id:number;
    nom:string;
    prenom:string;
    matricule:string;
    motDePasse:string;
    idProjet:number;
    nomProjet="";
    etat:string;
    //J'ai ajouté des attributs a la class puisqu'on ne fait jamais de post developpeurs cela permet de simplifier la jonction des donnés
    nbHeures=0;
    nbComm=0;
    nbSessTrav=0;
    constructor()
    {
        this.id=0;
        this.nom="";
        this.prenom="";
        this.matricule="";
        this.motDePasse="";
        this.idProjet=0;
        this.etat="inactif";
    }
}