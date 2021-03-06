import { Component, OnInit, OnDestroy } from '@angular/core';
import { IonicPage, MenuController, Nav, NavController, NavParams} from "ionic-angular";
import { AngularFireDatabase, FirebaseListObservable} from "angularfire2/database";
import { BoardService} from "../../app/services/board/board.service";
import { Subscription } from 'rxjs/Subscription';

/**
 * This class represents the lazy loaded DashboardComponent.
 */
@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage implements OnInit, OnDestroy  {
	private courses:any;
	boards: Array<{title: string, component: any, params: {}}>;
	// studentBoards: Array<{title: string, component: any, params: {}}>;
	// instructorBoards: Array<{title: string, component: any, params: {}}>;
 	user: any;
 	boardSub: Subscription;

  	constructor(private menuCtrl: MenuController,private navParams: NavParams, public navCtrl: NavController, private boardService: BoardService) {
	  	this.user = navParams.get("user");
  	}

  	ngOnInit():void{
    	this.boardSub = this.boardService.boards$.subscribe(
		  item => {
		    if(item){
		      	this.boards=item;
		    }
		});
  	}

  	 ngOnDestroy():void{
	    this.boardSub.unsubscribe();
	  }

	openMenu(){
		this.menuCtrl.open();
	}

	openPage(p){
    this.boardService.setCurrentPage(p);
		// navigate to the new page if it is not the current page
		console.log("DASHBOARD USER");
		console.log(this.user);
	    this.navCtrl.setRoot(p.component, {boardId: p.params.bid, title: p.title, user: this.user});
	}
}
