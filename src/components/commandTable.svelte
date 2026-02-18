<script>
import data from "../lib/data/commands.json";
import {
    terminalValue
} from "$lib/stores.js";
export let run = async (cmd) => terminalValue.set(cmd);
</script>

<table>
    <thead>
        <tr style="font-size: clamp(0.5rem, 1vw + 8px, 3rem)">
            <td style="text-align: start;"><h1>Commands</h1></td>
            <td class="command__description" style="text-align: end;"><h1>Def</h1></td
                >
                </tr>
                </thead>

                <tbody>
                    {#each data.commands as line}
                    <tr>
                        <td>
                            <div
                                style="display: flex; flex-direction: column; text-align: left; gap: 8px;"
                                >
                                {#if line.command == "cd"}
                                {line.command}
                                <hr style="height: 1px; border: none; background-color: white;" />
                                <div
                                    style="display: flex; flex-direction: column; justify-content: space-evenly; margin-left: 10%;"
                                    >
                                    {#each Object.entries(data["/"]["pages"]) as [key, value]}
                                    <div>
                                        <div style="text-align: left;">
                                            <button
                                                class="btn-command"
                                                onclick={() => run(line.command + " " + key)}
                                                style="width: 100%; height: 100%; text-align: start;"
                                                >
                                                <div
                                                    style="
                                                    display: flex;
                                                    flex-direction: column;
                                                    width: 100%;
                                                    justify-content: space-between;
                                                    "
                                                    >
                                                    <h3>{key}</h3>
                                                    <div
                                                        style="
                                                        text-align: right;
                                                        padding-left: 4px;
                                                        color: var(--color-txt-secondary);
                                                        "
                                                        >
                                                        {value.description}
                                                    </div>
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                                    <hr
                                        style="height: 1px; border: none; background-color: gray;"
                                        />
                                    {/each}
                                </div>
                                {:else}
                                <button
                                    class="btn-command"
                                    onclick={() => run(line.command)}
                                    style="width: 100%; height: 100%; text-align: start;"
                                    >
                                    <h3>{line.command}</h3>
                                </button>
                                {/if}
                            </div>
                        </td>
                        <td class="command__description" style="width: 35%;">
                            <button
                                class="btn-command"
                                onclick={() => run(line.command)}
                                style="width: 100%; height: 100%; text-align: end;"
                                >
                                {line.description}
                            </button>
                        </td>
                    </tr>
                    {/each}
                </tbody>
                </table>
