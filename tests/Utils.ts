export function formatCPF(cpf: string): string {
    const validCPF = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, 
        function( regex, param1, param2, param3, param4 ) {
            return param1 + '.' + param2 + '.' + param3 + '-' + param4;
        })
    return validCPF
}