import { PageInput } from '../Paging/pageInput';

export class ProductInputWithSpec extends PageInput {
  Title?: string;
  StartPrice?: number;
  EndPrice?: number;

  constructor(
    pageId: number,
    pageSize: number,
    Title?: string,
    StartPrice?: number,
    EndPrice?: number
  ) {
    super(pageId, pageSize);
    this.Title = Title;
    this.StartPrice = StartPrice;
    this.EndPrice = EndPrice;
  }
}
