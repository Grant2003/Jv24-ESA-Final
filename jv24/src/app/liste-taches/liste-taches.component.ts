//-----------------------------------
  //   Fichier : listeTaches.ts
  //   Par:      Alain Martel
  //   Date :    2024-10-21
  //   Modiifié: 
  //-----------------------------------

import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Developpeur } from '../modele/developpeur';
import { tr } from '../util';
import { Tache } from '../modele/tache';
import { SessionTravail } from '../modele/sessionTravail';
import { JvService } from '../jv.service';

@Component({
  selector: 'app-liste-taches',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './liste-taches.component.html',
  styleUrl: './liste-taches.component.css'
})
export class ListeTachesComponent {
  visible=false;
  listeTac:Tache[] = new Array();
  dev = new Developpeur();

  @Output() quitterLT=new EventEmitter<any>();
  @Output() demarrerSesTrav= new EventEmitter<{dev:Developpeur,idTache:number}>();

  //------------------------------------------------
  //
  //------------------------------------------------
  constructor(private jvSrv:JvService)
  {}

  //------------------------------------------------
  //
  //------------------------------------------------
  onConnexion(dev:Developpeur)
  {
     this.listeTac = new Array();
     this.dev = dev;

     //tr("getTaches pour porjet " + dev.idProjet);
     this.jvSrv.getTaches(dev.idProjet).subscribe(
       {
          next:
            tabTac =>
            {
              tr("Recup de " + tabTac.length + " tâches");
              this.listeTac = tabTac;
            },

          error:
            err=>
              {
                tr("Erreur 44 HTTP: Vérifiez le serveur", true, true);
              }  
       }
     );
     this.visible=true;
     tr(dev.prenom + " " + dev.nom + " connexion réussie!");
  }

  //------------------------------------------------
  //
  //------------------------------------------------
  demarrerSessionTravail(idTac:number)
  {
    this.visible=false;
    this.dev.etat = "actif";
    this.demarrerSesTrav.emit({dev:this.dev, idTache:idTac});
  }

  //------------------------------------------------
  //
  //------------------------------------------------
  onchangerTache(dev:Developpeur)
  {

    this.onConnexion(dev);
    this.visible=true;
  }

   //------------------------------------------------
  //
  //------------------------------------------------
   quitter()
  {
     this.visible = false;
     this.quitterLT.emit();

  }
}
