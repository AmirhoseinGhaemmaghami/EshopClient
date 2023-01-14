import { PageInput } from '../Paging/pageInput';

export class ProductInputWithSpec extends PageInput {
  constructor(
    pageId: number,
    pageSize: number,
    public Title?: string,
    public StartPrice?: number,
    public EndPrice?: number,
    public categories?: number[],
    public SortColumn?: string,
    public SortOrder?: string
  ) {
    super(pageId, pageSize);
  }
}
