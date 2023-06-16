import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

declare var window: any;

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const script = document.createElement('script');
      script.src = 'https://www.paypalobjects.com/donate/sdk/donate-sdk.js';
      script.charset = 'UTF-8';
      script.onload = () => {
        this.renderPayPalButton();
      };
      document.body.appendChild(script);
    }
  }

  renderPayPalButton(): void {
    const donateButtonContainer = document.getElementById('donate-button-container');
    const donateButton = document.getElementById('donate-button');
    const PayPal = window['PayPal'];

    PayPal.Donation.Button({
      env: 'production',
      hosted_button_id: 'SDF5YWKLVH3TA',
      image: {
        src: 'https://www.paypalobjects.com/en_US/MX/i/btn/btn_donateCC_LG.gif',
        alt: 'Donate with PayPal button',
        title: 'PayPal - The safer, easier way to pay online!',
      },
    }).render('#donate-button');
  }
}
