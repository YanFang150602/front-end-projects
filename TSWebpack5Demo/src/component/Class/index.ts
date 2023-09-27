class Home {
  ads: string;
  private log: string[] | undefined;
  
  constructor(ads) {
    this.ads = ads;
    this.changeLog();
  }
  
  private changeLog() {
    if (!this.log) {
      this.log = [];
    }
    const dateFormatStr = this.getDate();
    this.log.push(`${dateFormatStr} 更改了广告内容：${this.ads}`);
    console.log(this.log.join('\n'));
  }
  
  private getDate(): string {
    const curDate = new Date();
    const year = curDate.getFullYear();
    const month = curDate.getMonth() + 1;
    const day = curDate.getDay();
    const hours = curDate.getHours();
    const minutes = curDate.getMinutes();
    const seconds = curDate.getSeconds();
    return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
  }
  
  public changeAdsContent(newContent: string): void {
    this.ads = newContent;
    this.changeLog();
  }
}

export default Home;
