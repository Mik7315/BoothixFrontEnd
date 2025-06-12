import { ResolveFn } from '@angular/router';
import { inject } from "@angular/core";
import { StatService } from "../services/stat.service";
import { Stat } from "../model/stat";

export const statResolver: ResolveFn<Stat | null> = (route) => {
  const statService = inject(StatService);

  return statService.getAll();
};
