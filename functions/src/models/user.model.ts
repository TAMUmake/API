export class User {

    public static HACKER_TYPE = 'hacker';
    public static SPONSOR_TYPE = 'sponsor';
    public static ADMIN_TYPE = 'admin';
    public static ORGANIZER_TYPE = 'organizer';

    public type: string = 'hacker';
    public applied: boolean = false;
    public created: any;
    public email: string = '';
    public name: string = '';

    public toDict() {
        const data: any = {};
        data.type = this.type;
        data.applied = this.applied;
        data.created = this.created;
        data.email = this.email;
        data.name = this.name;
        return data;
    }
}