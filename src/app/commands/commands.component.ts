import {Component, OnInit} from '@angular/core';
import {ApiService} from '../common/services/api.service';
import {Command} from '../common/models/command';
import {Request} from '../common/interfaces/request';

@Component({
    selector: 'app-commands',
    templateUrl: './commands.component.html',
    styleUrls: ['./commands.component.scss']
})
export class CommandsComponent implements OnInit {

    /**
     * Path to api commands.
     * @type {string}
     */
    readonly commandsPath: string = '/v1/commands';

    /**
     * Lists commands.
     * @type {Array}
     */
    public commands: Command[] = [];

    /**
     * User can edit command.
     * @type {boolean}
     */
    protected canEdit: boolean = false;

    /**
     * User can delete command.
     * @type {boolean}
     */
    protected canDelete: boolean = false;

    /**
     * User can create command.
     * @type {boolean}
     */
    protected canCreate: boolean = false;

    /**
     * Request params.
     */
    private request: Request;

    /**
     * Current Command for edit.
     */
    public currentCommand: Command;

    /**
     * Command to create.
     */
    public createCommand: Command;

    /**
     * is edit action.
     * @type {boolean}
     */
    public isEdit: boolean = false;

    /**
     *
     * @param api
     */
    constructor(private api: ApiService) {
        this.createCommand = new Command();
    }

    ngOnInit() {
        this.getList()
    }

    /**
     * Get list commands from api.
     */
    protected  getList(): void {
        this.request = {
            'url': this.commandsPath
        };
        this.api.apiGet(this.request).then((res) => {
            this.commands = res.commands;
            this.canCreate = res.canCreate;
            this.canEdit = res.canEdit;
            this.canDelete = res.canDelete;
        });
    }

    /**
     * Event on save new command.
     * @param save
     */
    protected onSave(save: boolean = true): void {
        if (save) {
            this.request = {
                'url': this.commandsPath,
                'data': this.createCommand,
            }
            this.api.apiPost(this.request).then((res) => {
                this.getList();
            })
        }
        this.createCommand = new Command();
    }

    /**
     * Event on update command
     * @param save
     */
    protected onUpdate(save: boolean): void {
        if (save) {
            this.request = {
                'url': this.commandsPath,
                'id': this.currentCommand.id,
                'data': this.currentCommand,
            }
            this.api.apiPut(this.request).then((res) => {
                this.getList();
            })
        }
        this.currentCommand = null;
        this.isEdit = false;
    }


    /**
     * Event on edit command.
     * @param id
     */
    protected onEdit(id: number) {
        this.getCurrentCommand(id);
        this.isEdit = true;
    }

    /**
     * Event on delete command.
     * @param id
     */
    protected onDelete(id: number) {
        this.request = {
            'url': this.commandsPath,
            'id': id
        };
        this.api.apiDelete(this.request).then((res) => {
            let index = this.getCommandIndex(id);
            if (index != -1) {
                this.commands.splice(index, 1);
            }
        })
    }

    /**
     * Get index command.
     * @param id
     * @return {number}
     */
    private getCommandIndex(id: number): number {
        this.commands.forEach((command, index) => {
            if (command.id == id) {
                return index;
            }
        });
        return -1;
    }

    /**
     * get Current command.
     * @param id
     */
    private getCurrentCommand(id: number): void {
        this.commands.forEach((command, index) => {
            if (command.id == id) {
                this.currentCommand = command;
            }
        })
    }

}
