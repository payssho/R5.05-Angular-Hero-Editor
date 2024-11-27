import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HelmetService } from "../../services/helmet-service.service";
import { HelmetInterface } from "../../data/helmetInterface";

@Component({
  selector: 'app-helmet-detail',
  standalone: true,
  templateUrl: './helmet-details.component.html',
  styleUrls: ['./helmet-details.component.css']
})
export class HelmetDetailComponent {

  helmetId: string | null | undefined;
  helmet?: HelmetInterface;

  private route = inject(ActivatedRoute);

  constructor(private helmetService: HelmetService, private location: Location) {}

  ngOnInit(): void {
    this.helmetId = this.route.snapshot.paramMap.get('id');
    if (this.helmetId) {
      this.helmetService.getHelmetById(this.helmetId).subscribe(helmet => {
        this.helmet = helmet;
      });
    }
  }

  goBack(): void {
    this.location.back();
  }
}
