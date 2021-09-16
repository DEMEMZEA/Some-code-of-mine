const BigInf = 2n ** 1024n - 1n

BigMath = {
    abs: function (x) {
        if (x < 0n) x = -x
        return x
    },
    nIntMult: function (Big, Num) {
        if (BigInt(Math.floor(Num)) * Big > BigInf) return BigInt(Math.floor(Num)) * Big
        return BigInt(Math.floor(Number(Big) * Num))
    },
    nIntDiv: function (x, y) {

        if (typeof x === "bigint" && typeof y === "bigint") return x / y
        if (typeof x === "number" && typeof y === "number"){
        if(x/y<bigInf) return BigInt(Math.floor(x / y))
        y = bigInt(Math.floor(1/y))
        return bigInt(x)*y
        } 
        if (typeof x === "bigint") {
            [Big, Num] = [x, y]
            if (BigMath.abs(Big) > BigInf) return Big / BigInt(Math.floor(Num))
            return BigInt(Math.floor(Number(Big) / Num))
        }
        if (typeof y === "bigint") {
            [Num, Big] = [x, y]
            if (BigMath.abs(Big) > BigInf) return 0n
            return BigInt(Math.floor(Num / Number(Big)))
        }
    },
    max: function (x, y) {
        if (x > y) return x
        return y
    },
    min: function (x, y) {
        if (x > y) return y
        return x
    },
    sign: function (x) {
        if (x > 0n) return 1n
        if (x < 0n) return -1n
        return 0n
    },
    log2n: function (x) {
        if (x < BigInf) return BigInt(Math.round(Math.log2(Number(x))))
        let p = 0n
        while (2n ** (2n ** p) < x) p++
        let k = 2n ** p
        let mode = BigMath.sign(2n ** k - x)
        for (i = p - 1n; i > -1n; i--) {
            mode = BigMath.sign(2n ** k - x)
            switch (mode) {
                case 0n: return k
                case 1n: k -= 2n ** i
                    break
                case -1n: k += 2n ** i
                    break
            }
        }
        return k
    },
    log10n: function (x) {
        if (x < BigInf) return BigInt(Math.round(Math.log10(Number(x))))
        let p = 0n
        while (10n ** (2n ** p) < x) p++
        let k = 2n ** p
        let mode = BigMath.sign(10n ** k - x)
        for (i = p - 1n; i > -1n; i--) {
            mode = BigMath.sign(10n ** k - x)
            switch (mode) {
                case 0n: return k
                case 1n: k -= 2n ** i
                    break
                case -1n: k += 2n ** i
                    break
            }
        }
        return k
    },
    pow: function (x, y) {
        if (typeof x === "bigint" && typeof y === "bigint") return x ** y
        if (Math.floor(Number(x) ** Number(y)) < BigInf) return BigInt(Math.floor(Number(x) ** Number(y)))
        let modulated = BigMath.log2n(x) % 1024n
        if (modulated === 0) return 2n ** BigInt(Math.floor(Number(modulated) * Number(y)))
        let Num = Number(x / (2n ** modulated))
        let log = Math.log2(Num)
        let Big = 2n ** BigInt(Math.floor(Number(modulated) * Number(y)))
        return Big * BigInt(Math.floor(2 ** (log * Number(y))))
    },
    logBase: function (Big, Base) {
        if (Big < BigInf) return BigInt(Math.round(Math.log(Number(Big)) / Math.log(Number(Base))))
        let p = 0n
        while (BigMath.pow(Base, 2n ** p) < Big) p++
        let k = 2n ** p
        let mode = BigMath.sign(BigMath.pow(Base, k) - Big)
        for (i = p - 1n; i > -1n; i--) {
            mode = BigMath.sign(BigMath.pow(Base, k) - Big)
            switch (mode) {
                case 0n: return k
                case 1n: k -= 2n ** i
                    break
                case -1n: k += 2n ** i
                    break
            }
        }
        return k
    }
}
