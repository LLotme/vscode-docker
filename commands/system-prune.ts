import vscode = require('vscode');
import { reporter } from '../telemetry/telemetry';
const teleCmdId: string = 'vscode-docker.system.prune';

export async function systemPrune() {

    const terminal = vscode.window.createTerminal("docker system prune");
    terminal.sendText(`docker system prune -f`);
    terminal.show();
    if (reporter) {
        reporter.sendTelemetryEvent('command', {
            command: teleCmdId
        });
    }
}