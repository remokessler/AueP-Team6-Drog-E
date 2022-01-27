import { Component, OnInit } from '@angular/core';
import { IRobot } from './robot.type';
import { RobotService } from './robot.service';

@Component({
  selector: 'app-robots-overview',
  templateUrl: './robots-overview.component.html',
  styleUrls: ['./robots-overview.component.css']
})
export class RobotsOverviewComponent implements OnInit {
  public loading = true;
  public robots: IRobot[] = [];

  public constructor(private robotService: RobotService) {
  }

  public async ngOnInit() {
    this.robotService.getRobots().subscribe(x => (this.robots = x));
  }
}
