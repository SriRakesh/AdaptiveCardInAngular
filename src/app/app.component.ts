import { Component, OnInit, ViewChild, ElementRef,Renderer2} from '@angular/core';
import * as AdaptiveCards from "adaptivecards";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  cards: any;
  output: any;
  textArea: any;
  testdata : any;
  @ViewChild('adaptiveCards')
  AdaptiveCards: ElementRef;

  constructor(private http: HttpClient,private renderer:Renderer2) {
    this.cards = new AdaptiveCards.AdaptiveCard();
  }

  ngOnInit() {
    this.cards.onExecuteAction = (action)=>{
      console.log(action);
      this.performAction(action);
      
    }
  }

  performAction(action : any){
    let message= 'Action\n';
    message +="Title: "+action.title;
    if(action instanceof AdaptiveCards.OpenUrlAction)
    {
      message += "    Type: Action.OpenUrl\n";
      message += "    Url: " + action.url + "\n";
      //window.open(action.url);
    }
    else if(action instanceof AdaptiveCards.SubmitAction)
    {
      message += "    Type: Action.Submit";
			message += "    Data: " + JSON.stringify(action.data);
    }
    else
    {
      message +="unknown";
    }
    alert(message);
  } 

  onClickConvert(json: any) {
    console.log(json);
    let jsonText = JSON.parse(json.value);
    console.log(jsonText)
    this.cards.parse(jsonText);
    console.log(this.cards);
    this.output = this.cards.render();
    console.log(this.output);
    //this.AdaptiveCards.nativeElement.innerHTML = this.output.innerHTML;
    this.renderer.appendChild(this.AdaptiveCards.nativeElement,this.output);
    
  }
}
//   var card = {
  //     "type": "AdaptiveCard",
  //     "version": "1.0",
  //     "body": [
  //         {
  //             "type": "Image",
  //             "url": "http://adaptivecards.io/content/adaptive-card-50.png"
  //         },
  //         {
  //             "type": "TextBlock",
  //             "text": "Hello **Adaptive Cards!**"
  //         }
  //     ],
  //     "actions": [
  //         {
  //             "type": "Action.OpenUrl",
  //             "title": "Learn more",
  //             "url": "http://adaptivecards.io"
  //         },
  //         {
  //             "type": "Action.OpenUrl",
  //             "title": "GitHub",
  //             "url": "http://github.com/Microsoft/AdaptiveCards"
  //         }
  //     ]
  // };
    
  //   this.getAdaptiveCard(card);