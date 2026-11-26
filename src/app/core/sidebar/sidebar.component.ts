import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

interface MenuItem {
  label: string;
  icon: string;
  route?: string;
  children?: MenuItem[];
}

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrl: "./sidebar.component.css",
})
export class SidebarComponent {
  @Input() visible = true;

  expandedMenu: string | null = null;

  menus: MenuItem[] = [
    {
      label: "Dashboard",
      icon: "⌂",
      route: "/dashboard",
    },
    {
      label: "Tasks",
      icon: "✓",
      children: [
        {
          label: "All Tasks",
          icon: "circle-fill",
          route: "/tasks",
        },
        {
          label: "My Tasks",
          icon: "circle-fill",
          route: "/tasks/my-tasks",
        },
        {
          label: "Create Task",
          icon: "circle-fill",
          route: "/tasks/create",
        },
      ],
    },
    {
      label: "Team",
      icon: "♙",
      children: [
        {
          label: "Members",
          icon: "circle-fill",
          route: "/team/members",
        },
        {
          label: "Assignments",
          icon: "circle-fill",
          route: "/team/assignments",
        },
      ],
    },
    {
      label: "Reports",
      icon: "▤",
      children: [
        {
          label: "Today Task",
          icon: "circle-fill",
          route: "/reports/today-task",
        },
        {
          label: "Last Day Task",
          icon: "circle-fill",
          route: "/reports/today-task",
        },
        {
          label: "Weekly Task",
          icon: "circle-fill",
          route: "/reports/weely-task",
        },
        {
          label: "Monthly Task",
          icon: "circle-fill",
          route: "/reports/monthly-task",
        },
        {
          label: "Running Sprint Task",
          icon: "circle-fill",
          route: "/reports/running-spring-task",
        },
        {
          label: "Pending Task",
          icon: "circle-fill",
          route: "/reports/pending-task",
        },
        {
          label: "Completed Task",
          icon: "circle-fill",
          route: "/reports/pending-task",
        },
      ],
    },
    {
      label: "Settings",
      icon: "⚙",
      children: [
        {
          label: "Profile",
          icon: "circle-fill",
          route: "/settings/profile",
        },
        {
          label: "Configuration",
          icon: "circle-fill",
          route: "/settings/configuration",
        },
      ],
    },
  ];

  toggleMenu(label: string): void {
    this.expandedMenu = this.expandedMenu === label ? null : label;
  }
}
