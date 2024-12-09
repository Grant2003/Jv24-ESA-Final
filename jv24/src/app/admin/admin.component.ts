//-----------------------------------
//   Fichier : admin.component.ts
//   Par:      Anthony Grenier
//   Date :    2024-11-24
//-----------------------------------
import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { tr } from '../util';
import { Developpeur } from '../modele/developpeur';
import { JvService } from '../jv.service';
import { SessionTravail } from '../modele/sessionTravail';
import { observeNotification } from 'rxjs/internal/Notification';
import { Commentaire } from '../modele/commentaire';
import { Projet } from '../modele/projet';



@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  visible=false;
  sessionEnCoursVisible = true;
  sommaireDevVisible = false;
  detailDevVisible = false;
  devTriee = false;
  msSecondes=6000;
  dateSession = new Date().valueOf();
  dateCourrante = new Date().valueOf();
  tempsÉcoulé= new Date().valueOf();
  tabSessions:SessionTravail[] = new Array();
  tabSessionsEnCours:SessionTravail[] = new Array();
  tabDev:Developpeur[] = new Array();
  copyTabDev:Developpeur[] = new Array();
  tabSessTravPourUnDev:SessionTravail[] = new Array();
  tabCommentaires:Commentaire[] = new Array();
  tabStats:Array<string>[] = new Array();
  tabStatsSessTrav: Array<string>[] = new Array();
  tabProjets: Array<Projet> = new Array();
  //------------------------------------------------
  //
  //------------------------------------------------
  constructor(private jvSrv:JvService)
  {
  }
  //------------------------------------------------
  //
  //------------------------------------------------
  //retourne un temps formaté avec un modificateur qui va diviser le nombre de secondes reçu pour obtenir la bonne unité de temps
  trouverNomProjet(id:number)
  {
    let nom="";
    this.tabProjets.forEach((projet) => {
      if (id == projet.id)
        nom = projet.nom;

      
    });

    return nom;
  }
  //------------------------------------------------
  //
  //------------------------------------------------
  obtenirTempsEnUnite(modificateur:number,idSesTrav:number)
  {
    let temps=0;
    this.tabStatsSessTrav.forEach(stats => {
      if(parseInt(stats[0])==idSesTrav)
      {
        temps = parseInt(stats[1]);
      }
    });
    return Math.round(temps/6/modificateur)/10;
  }
  //------------------------------------------------
  //
  //------------------------------------------------
  creerTabSessionDev(idDev : number)
  {
    this.tabSessTravPourUnDev = new Array();

    this.tabSessions.forEach(session => {
      if(session.idDev == idDev)
        this.tabSessTravPourUnDev.push(session);
    });
      this.tabSessTravPourUnDev.sort(this.trierSessionTravail)
  }
  //------------------------------------------------
  //
  //------------------------------------------------
  onConnexion()
  {
    this.visible=true;
    this.dateCourrante = new Date().valueOf();
    this.obtenirSessions();
    this.obtenirDeveloppeurs();
    this.obtenirCommentaire();
    this.obtenirProjets();
    this.obtenirStatsPourUnDev();
    this.obtenirStatsSessTrav();
  }
  //------------------------------------------------
  //
  //------------------------------------------------
  obtenirStatsSessTrav() 
  {
    this.jvSrv.getStatSessTrav().subscribe(
      {
        next:
         tabStats=>
         {
          this.tabStatsSessTrav = tabStats;
         },
        error: 
        err=>
        {
         tr("Erreur 117 vérifiwer le serveur", true);
        } 
      }
    )
  }
  //------------------------------------------------
  //
  //------------------------------------------------
  obtenirProjets() 
  {
    this.jvSrv.getProjets().subscribe(
      {
        next:
        tabProjets=>
         {
          this.tabProjets = tabProjets;
         },
        error: 
        err=>
        {
         tr("Erreur 118 vérifiwer le serveur", true);
        } 
      }
    )
  }
  //------------------------------------------------
  //
  //------------------------------------------------
  activerSommaireDev()
  {
    this.sessionEnCoursVisible = false;
    this.sommaireDevVisible = true;
    this.detailDevVisible = false;
    this.obtenirStatsDev();
  }  
  //------------------------------------------------
  //
  //------------------------------------------------
  activerDetailDev(idDev : number)
  {
    this.sessionEnCoursVisible = false;
    this.sommaireDevVisible = false;
    this.detailDevVisible=true;
    this.creerTabSessionDev(idDev);
  }
  //------------------------------------------------
  //
  //------------------------------------------------
  activerSessionEnCours()
  {
    this.sessionEnCoursVisible = true;
    this.sommaireDevVisible = false;
    this.detailDevVisible = false;
  }
  //------------------------------------------------
  //
  //------------------------------------------------
  obtenirSessions()
  {
    this.jvSrv.getSessions().subscribe(
      {
        next:
         sessionsActiveBD=>
         {
          sessionsActiveBD.forEach(session => {
            this.tabSessions.push(session);
            if(session.fin == null)
              this.tabSessionsEnCours.push(session);
          });
         },
        error: 
        err=>
        {
         tr("Erreur 117 vérifiwer le serveur", true);
        } 

      }

    )
  }
  //------------------------------------------------
  //
  //------------------------------------------------
  obtenirStatsPourUnDev()
  {
    this.jvSrv.getStatsPourUnDev().subscribe(
      {
        next:
         tabStats=>
         {
          this.tabStats = tabStats;
         },
        error: 
        err=>
        {
         tr("Erreur 117 vérifiwer le serveur", true);
        } 
      }
    )
  }
  //------------------------------------------------
  //
  //------------------------------------------------
  obtenirDeveloppeurs()
  {
    this.jvSrv.getDevs().subscribe(
      {
        next:
         developpeursBD=>
         {
          developpeursBD.forEach(dev => {
            this.tabDev.push(dev);
          });
         },
         
        error: 
        err=>
        {
         tr("Erreur 117 vérifiwer le serveur", true);
        } 
      }
    )
  }
  //------------------------------------------------
  //
  //------------------------------------------------
  //On ajoute chaque statistiques dans des propriétés des objets dev du tabdev
  obtenirStatsDev()
  {
    this.tabDev.forEach(dev =>{
      this.tabStats.forEach(stats => {
        if(Number.parseInt(stats[0]) == dev.id)
        {
          dev.nbHeures=Math.round(Number.parseInt(stats[1])/360)/10;
          dev.nbComm=Number.parseInt(stats[2]);
          dev.nbSessTrav=Number.parseInt(stats[3]);
        }
      });
    })
    
    this.tabDev.sort(this.trierDevs);
  }
  //------------------------------------------------
  //
  //------------------------------------------------
  obtenirNbSessions(idDev : number)
  {
    let nbSessions = 0;
    this.tabSessions.forEach(session => {
      if(session.idDev == idDev)
        nbSessions++;
    });
    return nbSessions;
  }
  //------------------------------------------------
  //
  //------------------------------------------------
  obtenirCommentaire()
  {
    this.tabCommentaires = new Array();

    this.jvSrv.getAllCommentaires().subscribe(
      {
        next:
         commentairesBD=>
         {
          commentairesBD.forEach(commentaire => {
            this.tabCommentaires.push(commentaire);
          });
         },
        error: 
        err=>
        {
         tr("Erreur 117 vérifiwer le serveur", true);
        } 
      }
    )
  }
  //------------------------------------------------
  //
  //------------------------------------------------
  obtenirNbCommentaireDev(idDev : number){
    let nbComm = 0;

    this.tabCommentaires.forEach(comm => {
      if(comm.idDev == idDev)
        nbComm++;
    });
    return nbComm;
  }
  //------------------------------------------------
  //
  //------------------------------------------------
  obtenirNbCommentaireSess(idSess : number)
  {
    let nbComm = 0;

    this.tabCommentaires.forEach(comm => {
      if(comm.idSession == idSess)
        nbComm++;
    });
    return nbComm;
  }
  //------------------------------------------------
  //
  //------------------------------------------------
  trierSessionTravail(sess1: SessionTravail, sess2: SessionTravail)
  {
    if (new Date(sess1.debut).valueOf() > new Date(sess2.debut).valueOf())
      return -1;
    if (new Date(sess1.debut).valueOf() < new Date(sess2.debut).valueOf())
      return 1;
    return 0;

  }
  //------------------------------------------------
  //
  //------------------------------------------------
  trierDevs(dev1:Developpeur,dev2:Developpeur)
  {
    if (dev1.nbHeures > dev2.nbHeures)
      return -1;
    if (dev1.nbHeures < dev2.nbHeures)
      return 1;


    return 0;
  }
}
