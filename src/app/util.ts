//-----------------------------------
  //   Fichier : 
  //   Par:      Alain Martel
  //   Date :    2024-10-21
  //-----------------------------------

  //------------------------------------------------
  //
  //------------------------------------------------
  export function tr(msg:string, alertOn=false, consoleOn:boolean=true)
  {
    if (consoleOn)
     console.log(msg);

    if (alertOn)
     alert(msg);
  }

  //------------------------------------------------
  //
  //------------------------------------------------
  export function dateISO(date:Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Ajout de 1 car les mois sont indexés à partir de 0
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

  //------------------------------------------------
  //
  //------------------------------------------------
  export const urlSrv = "http://localhost/3D4/jv24-srv/";
  //export const urlSrv = "https://amartel.techinfo-cstj.ca/jv24-srv/";