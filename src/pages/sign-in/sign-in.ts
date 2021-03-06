import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import { SideMenuComponent} from "../../app/components/sideMenu/sideMenu";
/**
 * Generated class for the SignInPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sign-in',
  templateUrl: 'sign-in.html',
})
export class SignInPage {
  email: string = "";
  password: string = "";
  students: FirebaseListObservable<any[]>;
  instructors: FirebaseListObservable<any[]>;

  constructor(public db: AngularFireDatabase, public afAuth: AngularFireAuth, public navCtrl: NavController, public alertCtrl: AlertController) {
    this.students = db.list('/Students');
    this.instructors = db.list('/Instructors');
    this.afAuth.auth.onAuthStateChanged( user => {
      if (user) {
        this.navCtrl.setRoot(SideMenuComponent, {"user": user});
      } else { }
    });
  }

  /*
  //not using this yet
  signup() {
    this.afAuth.auth.createUserWithEmailAndPassword(this.email, this.password).catch(function(error) {
      // Handle Errors here.
      //var errorCode = error.code;
      var errorMessage = error.message;
    });
  }
  */

  login() {
    console.log('email:' + this.email);
    console.log('pass: ' + this.password);
    this.afAuth.auth.signInWithEmailAndPassword(this.email, this.password).catch(error => {
      var errorMessage = error.message;
      //TODO: dialog box on login failure here
      this.presentLoginFailureAlert();
      console.log('error with login!!' + errorMessage);
    });
  }

  presentLoginFailureAlert() {
    const alert = this.alertCtrl.create({
      title: 'Failed to login',
      subTitle: 'Email or password is incorrect. Please try again.',
      buttons: ['OK']
    });
    alert.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignInPage');
  }

}
