//imports
import { ShiftClass } from "./ShiftClass";


export class WorkerClass{

  constructor(private id: number, private haslo: string,
              private imie: string, private nazwisko: string,
              private ulica: string, private numerDomu: number, private miasto: string, private kodPocztowy: string,
              private numerTelefonu: number, private email: string,
              private stanowiskoId?: number, private dzialID?: number,
              private shift?: ShiftClass){
  }


  get Id():number{return this.id;}
  get Haslo():string{return this.haslo};
  get Imie():string{return this.imie;}
  get Nazwisko():string{return this.nazwisko;}
  get Ulica():string{return this.ulica;}
  get NumerDomu():number{return this.numerDomu;}
  get Miasto():string{return this.miasto;}
  get KodPocztowy():string{return this.kodPocztowy;}
  get NumerTelefonu():number{return this.numerTelefonu;}
  get Email():string{return this.email;}
  get StanowiskoId():number | undefined{
    return this.stanowiskoId;
  }
  get DzialID():number | undefined{
    return this.dzialID;
  }
  get Shift():ShiftClass | undefined{
    return this.shift;
  }

  set Id(id: number){this.id = id;};
  set Haslo(haslo:string){this.haslo = haslo};
  set NumerDomu(numerDomu: number){this.numerDomu = numerDomu;}
  set NumerTelefonu(numerTelefonu: number){this.numerTelefonu = numerTelefonu;}
  set StanowiskoId(stanowiskoId: number){this.stanowiskoId = stanowiskoId;}
  set DzialID(dzialID: number){this.dzialID = dzialID;}
  set Imie(imie: string){this.imie = imie;}
  set Nazwisko(nazwisko: string){this.nazwisko = nazwisko;}
  set Ulica(ulica: string){this.ulica = ulica;}
  set Miasto(miasto: string){this.miasto = miasto;}
  set KodPocztowy(kodPocztowy: string){this.kodPocztowy = kodPocztowy;}
  set Shift(shift: ShiftClass){this.shift = shift;}


}
