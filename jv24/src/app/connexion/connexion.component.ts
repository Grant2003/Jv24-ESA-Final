  //-----------------------------------
  //   Fichier : connexion.component.ts
  //   Par:      Alain Martel
  //   Date :    2024-09-09
  //   Modiifié par : 
  //-----------------------------------
import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { tr } from '../util';
import { Developpeur } from '../modele/developpeur';
import { JvService } from '../jv.service';


@Component({
  selector: 'app-connexion',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './connexion.component.html',
  styleUrl: './connexion.component.css'
})
export class ConnexionComponent {
  visible=true;
  matricule:string="";
  motDePasse="";
  dev:Developpeur = new Developpeur();
  matAdmin = "admin"
  motDePasseAdmin = "11"

  constructor(private jvSrv:JvService)
  {}

  @Output() ConnexionReussieInactif = new EventEmitter<Developpeur>();
  @Output() ConnexionReussieActif   = new EventEmitter<Developpeur>();
  @Output() ConnexionAdmin = new EventEmitter;

  //-----------------------------------
  // 
  //-----------------------------------
  validerConnexion()
  {
    let trouve=false;
    this.triche();
    tr("tentative de connexion de " + this.matricule + " avec le mot de passe:" + this.motDePasse);



    this.jvSrv.getConnexion(this.matricule, this.motDePasse).subscribe(
      {
      next:
      dev =>
      {
         if (dev != undefined)
         {
          tr("Connexion OK");

          this.visible= false;
          this.dev = dev;

          if (this.dev.etat == 'inactif')
             this.ConnexionReussieInactif.emit(this.dev);
          else
             this.ConnexionReussieActif.emit(this.dev);

         }
         else if(this.matricule == this.matAdmin && this.motDePasse == this.motDePasseAdmin){
          this.ConnexionAdmin.emit();
          console.log("adminman")
          this.visible=false;
        }
         else
         {
          tr("Erreur 56: info de connexion invalide", true);
         }
      },
      error:
        err =>
      {
        tr("Erreur 51: problème avec le serveur",true);
      }
    }
    );
  }

  //-----------------------------------
  // 
  //-----------------------------------
  triche()
  {
    if (this.matricule.length == 0)
    {
       this.matricule = "1111111";
       this.motDePasse = "11";
    }
  }

  //-----------------------------------
  // 
  //-----------------------------------
  onQuitter()
  {
    this.matricule = "";
    this.motDePasse = "";
    this.visible=true;
  }

}
