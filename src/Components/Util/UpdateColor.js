import { UserTypeConst } from "./StaticConst";
// those if statements needs another nested if statement to check user type, once we start using userType context, we don't
// need to reassign the colors every time we click
export const updateColor = (type) => {
  type = parseInt(type);
  if (
    type === UserTypeConst.hopkinsAdmin ||
    type === UserTypeConst.hopkinsDoctor
  ) {
    document.documentElement.style.setProperty(
      "--header-text-color",
      "var(--hopkins-header-text-color)"
    );
    document.documentElement.style.setProperty(
      "--header-background-color",
      "var(--hopkins-header-background-color)"
    );
    document.documentElement.style.setProperty(
      "--sidenav-background-color",
      "var(--hopkins-sidenav-background-color)"
    );
    document.documentElement.style.setProperty(
      "--sidenav-text-color",
      "var(--hopkins-sidenav-text-color)"
    );
    document.documentElement.style.setProperty(
      "--footer-text-color",
      "var(--hopkins-header-text-color)"
    );
    document.documentElement.style.setProperty(
      "--footer-background-color",
      "var(--hopkins-sidenav-background-color)"
    );
  } else if (type === UserTypeConst.bavaria) {
    document.documentElement.style.setProperty(
      "--header-text-color",
      "var(--bavaria-header-text-color)"
    );
    document.documentElement.style.setProperty(
      "--header-background-color",
      "var(--bavaria-header-background-color)"
    );
    document.documentElement.style.setProperty(
      "--sidenav-background-color",
      "var(--bavaria-sidenav-background-color)"
    );
    document.documentElement.style.setProperty(
      "--sidenav-text-color",
      "var(--bavaria-sidenav-text-color)"
    );
    document.documentElement.style.setProperty(
      "--footer-text-color",
      "var(--bavaria-sidenav-text-color)"
    );
    document.documentElement.style.setProperty(
      "--footer-background-color",
      "var(--bavaria-sidenav-background-color)"
    );
  } else if (type === UserTypeConst.fda) {
    document.documentElement.style.setProperty(
      "--header-text-color",
      "var(--fda-header-text-color)"
    );
    document.documentElement.style.setProperty(
      "--header-background-color",
      "var(--fda-header-background-color)"
    );
    document.documentElement.style.setProperty(
      "--sidenav-background-color",
      "var(--fda-sidenav-background-color)"
    );
    document.documentElement.style.setProperty(
      "--sidenav-text-color",
      "var(--fda-sidenav-text-color)"
    );
    document.documentElement.style.setProperty(
      "--footer-text-color",
      "var(--fda-sidenav-text-color)"
    );
    document.documentElement.style.setProperty(
      "--footer-background-color",
      "var(--fda-sidenav-background-color)"
    );
  }
};
