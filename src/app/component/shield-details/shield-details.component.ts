import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ShieldService} from "../../services/shield-service.service";
import { ShieldInterface } from "../../data/shieldInterface";

@Component({
  selector: 'app-shield-detail',
  standalone: true,
  templateUrl: './shield-details.component.html',
  styleUrls: ['./shield-details.component.css']
})
export class ShieldDetailComponent {

  shieldId: string | null | undefined;
  shield?: ShieldInterface;

  private route = inject(ActivatedRoute);

  constructor(private shieldService: ShieldService, private location: Location) {}

  ngOnInit(): void {
    this.shieldId = this.route.snapshot.paramMap.get('id');
    if (this.shieldId) {
      this.shieldService.getShieldById(this.shieldId).subscribe(shield => {
        this.shield = shield;
      });
    }
  }

  goBack(): void {
    this.location.back();
  }
}
