import { UiModule } from './../ui.module';
import { UserFormComponent } from './../user-form/user-form.component';
import { auth, User } from 'firebase';
import { AuthService } from './../../core/auth.service';
import { AppModule } from './../../app.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { async } from '@angular/core/testing';
import { AngularFirestore } from 'angularfire2/firestore';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { tap, first, publishBehavior } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IDog } from '/home/messiks/Documents/dirty_dev/dogfire/src/app/ui/user-form/dog';
import { json } from 'express';


@Component({
  selector: 'app-dog-form',
  templateUrl: './dog-form.component.html',
  styleUrls: ['./dog-form.component.scss']
})



export class DogFormComponent implements OnInit {
  // variable pra guardaar el form
  myForm: FormGroup;

  // estado del formulario
  loading = false;
  success = false;
  userid: Observable <any>;

  // lista de razas de perros
  // private razas = '/src/app/ui/user-form/doglist.json';
  // variable para guardar las razas
  public razas = [
    { name: 'affenpisncher' },
    { name: 'african' },
    { name: 'affenpins' },
    { name: 'african' },
    { name: 'airedale' },
    { name: 'akita' },
    { name: 'appenzell' },
    { name: 'basenji' },
    { name: 'beagle' },
    { name: 'bluetick' },
    { name: 'borzoi' },
    { name: 'bouvier' },
    { name: 'boxer' },
    { name: 'brabancon' },
    { name: 'briard' },
    { name: 'bulldog' }
  ];

  constructor(
              private _formBuilder: FormBuilder,
              private _afs: AngularFirestore,
              public _auth: AuthService) { }
  ngOnInit() {

      this.myForm = this._formBuilder.group({
      genero: ['', [
        Validators.required,
        Validators.pattern('[m|h]')
      ]],
      age: [null, [
        Validators.required,
        Validators.minLength(1),
        Validators.min(0),
        Validators.max(12)
      ]],
      agree: [false, [Validators.requiredTrue]],
      descripcion: ['', [Validators.required]],
      raza: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      uid: ['', ]
    });
  }

  // submit
  async submitHandler() {
    this.loading = true;
// this.userid = this._auth;

// me susbcribo a la respuesta del observable
this.userid.subscribe(res => console.log(res));
    // getting current value of the form
    const formValue = this.myForm.value;
    // catching all the posible errors
    try {
      console.log(this._auth.user);
     await this._afs.collection('dogs').add(formValue);
     // await this._afs.collection('dogs').add(this._auth.user as user);
    } catch (err) { console.log(err); }

    this.loading = false;
  }
  get uid() {
    return this.myForm.get('uid');
  }

  get nombre() {
    return this.myForm.get('nombre');
  }
  get raza() {
    return this.myForm.get('raza.name');
  }
  get descripcion() {
    return this.myForm.get('descripcion');
  }

  get genero() {
    return this.myForm.get('genero');
  }

  get age() {
    return this.myForm.get('age');
  }

  get agree() {
    return this.myForm.get('agree');
  }

}
