import { ResolveFn } from '@angular/router';
import { Option } from "../model/option";
import { inject } from "@angular/core";
import { OptionService } from "../services/option.service";

export const optionResolver: ResolveFn<Option | null> = (route) => {
  const optionService = inject(OptionService);
  const optionId = route.params['idOption'];

  if(!!optionId) {
    return optionService.getById(optionId);
  } else {
    return null;
  }
};
