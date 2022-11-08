# Linqpad setup action

This action downloads either Linqpad 5 or 6 and adds it to the PATH for subsequent commands in your workflow to use.

As Linqpad 5 and 6 can work side-by-side, you may invoke this action more than once if required.

## Example usage (default with Linqpad 6)

`uses: pdematagoda/setup-linqpad-action@v0.5`

## Example usage (version specified)

The `version` input parameter accepts either `5.x` or `6.x`.

```yaml
    uses: pdematagoda/setup-linqpad-action@v0.6
        input:
            version: '5.x'
```